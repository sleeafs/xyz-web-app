import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { User, Task } from '../models/user.model';

/**
 * UserService handles user-related business logic including:
 * - Aggregating user data with task statistics
 * - Calculating user performance scores
 * - Filtering users by various criteria
 * - Loading user data asynchronously
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private d: any; // data service reference
  private c = 0; // counter

  constructor(private dataService: DataService) {
    this.d = dataService; // store reference
  }

  /**
   * Retrieves users enriched with their task statistics and performance scores
   * @returns Array of users with added task statistics
   */
  doStuff() {
    let r = []; // results array
    let u = this.d.getUsers() as any; // all users
    let t = this.d.getTasks() as any; // all tasks

    for (let i = 0; i < u.length; i++) {
      let x = u[i]; // current user
      let y = []; // user's tasks

      for (let j = 0; j < t.length; j++) {
        if (t[j].userId === x.id) {
          y.push(t[j]);
        }
      }

      let a = 0; // completed count
      let b = 0; // in progress count
      let c = 0; // failed count
      let d = 0; // pending count

      for (let k = 0; k < y.length; k++) {
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

      let performanceScore = this.calc(x.id);

      r.push({
        ...x,
        tasksCompleted: a,
        tasksInProgress: b,
        tasksFailed: c,
        tasksPending: d,
        totalTasks: y.length,
        performanceScore: performanceScore
      });
    }

    return r;
  }

  /**
   * Calculates a performance score for a user based on their task completion metrics
   * Score factors in completed tasks, in-progress tasks, failed tasks, and user role
   * @param id - The user ID to calculate score for
   * @returns Performance score (0-100)
   */
  calc(id: number) {
    // get all users from data service
    let u = this.d.getUsers() as any; // all users
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
  

  /**
   * Filters users based on specified criteria
   * @param t - Filter type (active, inactive, admin, manager, highPerformer)
   * @returns Filtered array of users
   */
  filter(t: string) {
    let u = this.d.getUsers() as any; // user list
    let r = []; // filtered results

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

  /**
   * Gets tasks for a specific user filtered by status
   * @param userId - The user ID
   * @param status - The task status to filter by
   * @returns Array of tasks matching the criteria
   */
  getUserTasksByStatus(userId: number, status: string): Task[] {
    const allTasks = this.dataService.getTasks() as any;
    return allTasks.filter((task: any) =>
      task.userId === userId && task.status === status
    );
  }
}
