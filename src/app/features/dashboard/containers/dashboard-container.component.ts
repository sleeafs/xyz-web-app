import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { DataService } from '../../../core/services/data.service';
import { User, Task } from '../../../models/user.model';

// CODE SMELL: God Component - Too many responsibilities
// VIOLATION: Single Responsibility Principle
// This component handles: data fetching, filtering, sorting, statistics, and rendering
@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.css']
})
export class DashboardContainerComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  tasks: Task[] = [];
  selectedUser: User | null = null;
  userTasks: Task[] = [];

  // CODE SMELL: Primitive obsession
  activeUsersCount: number = 0;
  totalTasks: number = 0;
  completedTasks: number = 0;
  filterType: string = 'all';
  sortColumn: string = '';
  sortDirection: string = 'asc';

  // VIOLATION: Dependency Inversion - depending on concrete implementations
  constructor(
    private userService: UserService,
    private dataService: DataService
  ) {}

  // CODE SMELL: Long method doing too many things
  ngOnInit() {
    this.loadData();
    this.calculateStats();
    this.applyFilters();
  }

  // CODE SMELL: Direct access to service data, not using observables
  loadData() {
    this.users = this.userService.doStuff();  // Using bad method name!
    this.tasks = this.dataService.getTasks();
  }

  // CODE SMELL: Complex calculation logic in component
  // VIOLATION: Single Responsibility - business logic should be in service
  calculateStats() {
    this.activeUsersCount = 0;
    this.totalTasks = 0;
    this.completedTasks = 0;

    // PERFORMANCE ISSUE: Multiple loops over same data
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].status === 'active') {
        this.activeUsersCount++;
      }
    }

    for (let i = 0; i < this.tasks.length; i++) {
      this.totalTasks++;
      if (this.tasks[i].status === 'completed') {
        this.completedTasks++;
      }
    }
  }

  // CODE SMELL: Type checking and conditional logic
  // VIOLATION: Open/Closed Principle
  applyFilters() {
    if (this.filterType === 'all') {
      this.filteredUsers = this.users;
    } else if (this.filterType === 'active') {
      this.filteredUsers = [];
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].status === 'active') {
          this.filteredUsers.push(this.users[i]);
        }
      }
    } else if (this.filterType === 'inactive') {
      this.filteredUsers = [];
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].status === 'inactive') {
          this.filteredUsers.push(this.users[i]);
        }
      }
    }
  }

  sortUsers(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredUsers.sort((a: any, b: any) => {
      let aVal = a[column];
      let bVal = b[column];

      if (this.sortDirection === 'asc') {
        if (aVal < bVal) return -1;
        if (aVal > bVal) return 1;
        return 0;
      } else {
        if (aVal < bVal) return 1;
        if (aVal > bVal) return -1;
        return 0;
      }
    });
  }

  getPerformanceScore(userId: number): number {
    return this.userService.calc(userId);  // Using bad method name!
  }

  getUserTaskCount(userId: number): number {
    let count = 0;
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].userId === userId) {
        count++;
      }
    }
    return count;
  }

  showUserDetails(userId: number) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === userId) {
        this.selectedUser = this.users[i];
        break;
      }
    }

    this.userTasks = [];
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].userId === userId) {
        this.userTasks.push(this.tasks[i]);
      }
    }
  }

  formatDate(date: Date): string {
    let d = new Date(date);
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let year = d.getFullYear();
    return month + '/' + day + '/' + year;
  }
}
