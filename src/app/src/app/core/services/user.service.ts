import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { User, Task } from '../models/user.model';

// CODE SMELL #1: Direct dependency on concrete class instead of abstraction
// VIOLATION: Dependency Inversion Principle
@Injectable({
  providedIn: 'root'
})
export class UserService {

  // CODE SMELL #2: Bad variable naming - not descriptive
  private d: any;
  private c = 0;

  // CODE SMELL #1: Depends on concrete DataService instead of interface
  constructor(private dataService: DataService) {
    this.d = dataService;
  }

  // CODE SMELL #3: Bad method name - doesn't describe what it does
  // Should be: getUsersWithTaskStatistics or enrichUsersWithTaskData
  doStuff() {
    let r = [];
    let u = this.d.getUsers();
    let t = this.d.getTasks();

    // CODE SMELL #4: PERFORMANCE - Nested for loops O(n²)
    // CRITICAL ISSUE
    for (let i = 0; i < u.length; i++) {
      let x = u[i];
      let y = [];

      // PERFORMANCE DISASTER - nested loop
      for (let j = 0; j < t.length; j++) {
        if (t[j].userId === x.id) {
          y.push(t[j]);
        }
      }

      // CODE SMELL #5: Bad variable names - single letters
      let a = 0;
      let b = 0;
      let c = 0;
      let d = 0;

      // Another nested loop - making it worse!
      for (let k = 0; k < y.length; k++) {
        // CODE SMELL #6: Too many if/else statements
        // Could use switch or lookup table
        if (y[k].status === 'completed') {
          a++;
        } else if (y[k].status === 'in-progress') {
          b++;
        } else if (y[k].status === 'failed') {
          c++;
        } else if (y[k].status === 'pending') {
          d++;
        }
      }

      r.push({
        ...x,
        stats: {
          completed: a,
          inProgress: b,
          failed: c,
          pending: d,
          total: y.length
        }
      });
    }

    return r;
  }

  // CODE SMELL #7: Too many comments instead of good naming
  // The comments are explaining what the code does because the code is unclear
  // SOLUTION: Use descriptive names and the code explains itself
  calc(id: number) {
    // get all users from data service
    let u = this.d.getUsers();
    // find the user by id
    let usr = null;

    // loop through users to find match
    for (let i = 0; i < u.length; i++) {
      // check if id matches
      if (u[i].id === id) {
        // set user variable
        usr = u[i];
        // exit loop
        break;
      }
    }

    // check if user exists
    if (usr == null) {
      // return 0 if no user
      return 0;
    }

    // start with score of 0
    let s = 0;
    // add points for completed tasks (10 points each)
    s = s + (usr.tasksCompleted * 10);
    // add points for in progress tasks (5 points each)
    s = s + (usr.tasksInProgress * 5);
    // subtract points for failed tasks (15 points each)
    s = s - (usr.tasksFailed * 15);

    // CODE SMELL #6: Multiple if/else - could use lookup object
    // adjust score based on role
    if (usr.role === 'admin') {
      // admins get 1.5x multiplier
      s = s * 1.5;
    } else if (usr.role === 'manager') {
      // managers get 1.3x multiplier
      s = s * 1.3;
    } else if (usr.role === 'user') {
      // regular users get 1.0x multiplier
      s = s * 1.0;
    }

    // CODE SMELL #6: More if/else chains
    // convert score to rating
    if (s > 1000) {
      return 100;
    } else if (s > 500) {
      return 75;
    } else if (s > 250) {
      return 50;
    } else {
      return 25;
    }
  }

  // CODE SMELL #8: ASYNC TIMING ISSUE
  // This method doesn't properly handle async operations
  // Can cause race conditions and timing bugs
  loadUserData(userId: number) {
    let result: any = null;

    // CODE SMELL: Pretending sync but should be async
    setTimeout(() => {
      const users = this.dataService.getUsers();
      result = users.find(u => u.id === userId);
      // DATA IS SET HERE but method already returned!
    }, 100);

    // BUG: Returns null before setTimeout completes
    return result;  // Will ALWAYS return null!
  }

  // CODE SMELL #8: Another async timing issue
  // Multiple async operations without proper coordination
  getUserWithTasks(userId: number) {
    let user: User | undefined;
    let tasks: Task[] = [];
    let isComplete = false;

    // CODE SMELL: Race condition - no guarantee of order
    setTimeout(() => {
      user = this.dataService.getUsers().find(u => u.id === userId);
      isComplete = true;
    }, 50);

    setTimeout(() => {
      tasks = this.dataService.getTasks().filter(t => t.userId === userId);
      isComplete = true;
    }, 75);

    // BUG: Returns before data is loaded
    // Even if we waited, we don't know which completes first
    return { user, tasks, isComplete };
  }

  // CODE SMELL #6: Massive if/else chain
  // CODE SMELL #5: Bad naming
  filter(t: string) {
    let u = this.d.getUsers();
    let r = [];

    // CODE SMELL #6: Adding new types requires modifying this method
    // VIOLATION: Open/Closed Principle
    if (t === 'active') {
      for (let i = 0; i < u.length; i++) {
        if (u[i].status === 'active') {
          r.push(u[i]);
        }
      }
    } else if (t === 'inactive') {
      for (let i = 0; i < u.length; i++) {
        if (u[i].status === 'inactive') {
          r.push(u[i]);
        }
      }
    } else if (t === 'admin') {
      for (let i = 0; i < u.length; i++) {
        if (u[i].role === 'admin') {
          r.push(u[i]);
        }
      }
    } else if (t === 'manager') {
      for (let i = 0; i < u.length; i++) {
        if (u[i].role === 'manager') {
          r.push(u[i]);
        }
      }
    } else if (t === 'highPerformer') {
      // PERFORMANCE: Calling calc() in a loop!
      for (let i = 0; i < u.length; i++) {
        if (this.calc(u[i].id) > 75) {
          r.push(u[i]);
        }
      }
    } else {
      r = u;
    }

    return r;
  }

  // BETTER EXAMPLE: This is how code SHOULD look
  // (Candidate should recognize this as good code)
  getUserTasksByStatus(userId: number, status: string): Task[] {
    const allTasks = this.dataService.getTasks();
    return allTasks.filter(task =>
      task.userId === userId && task.status === status
    );
  }
}

// EXPECTED REFACTORINGS:
//
// 1. NESTED LOOPS → Use Map/HashMap for O(n) complexity
// 2. BAD NAMING → Rename: doStuff → getUsersWithTaskStats, calc → calculatePerformanceScore
// 3. BAD VARIABLES → u,t,r,x,y,a,b,c,d → users, tasks, results, user, userTasks, completed, inProgress
// 4. TOO MANY COMMENTS → Remove comments, use descriptive names instead
// 5. CONCRETE VS ABSTRACT → Create IDataRepository interface
// 6. IF/ELSE CHAINS → Use strategy pattern, lookup objects, or switch statements
// 7. ASYNC ISSUES → Return Promises or Observables, use async/await, proper error handling
