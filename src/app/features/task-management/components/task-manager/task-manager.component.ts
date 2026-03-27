import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../core/services/data.service';
import { UserService } from '../../../../core/services/user.service';
import { Task, User } from '../../../../models/user.model';

// CODE SMELL: Component with too many responsibilities
// VIOLATION: Single Responsibility Principle
@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent implements OnInit {
  tasks: Task[] = [];
  users: User[] = [];
  filteredTasks: Task[] = [];

  selectedUserId: string = '';
  selectedStatus: string = '';
  selectedPriority: string = '';

  constructor(
    private dataService: DataService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadData();
    this.applyFilters();
  }

  loadData() {
    this.tasks = this.dataService.getTasks();
    this.users = this.dataService.getUsers();
  }

  // CODE SMELL: Complex filtering logic with deep nesting
  // PERFORMANCE ISSUE: Runs on every filter change with manual loops
  applyFilters() {
    this.filteredTasks = [];

    // PERFORMANCE ISSUE: Manual filtering instead of using array methods
    for (let i = 0; i < this.tasks.length; i++) {
      let task = this.tasks[i];
      let include = true;

      // CODE SMELL: Deep nesting
      if (this.selectedUserId !== '') {
        if (task.userId !== Number(this.selectedUserId)) {
          include = false;
        }
      }

      if (include && this.selectedStatus !== '') {
        if (task.status !== this.selectedStatus) {
          include = false;
        }
      }

      if (include && this.selectedPriority !== '') {
        if (task.priority !== this.selectedPriority) {
          include = false;
        }
      }

      if (include) {
        this.filteredTasks.push(task);
      }
    }
  }

  // CODE SMELL: Methods called from template on every change detection
  // PERFORMANCE ISSUE: Recalculates on every cycle
  countByStatus(status: string): number {
    let count = 0;
    for (let i = 0; i < this.filteredTasks.length; i++) {
      if (this.filteredTasks[i].status === status) {
        count++;
      }
    }
    return count;
  }

  // PERFORMANCE ISSUE: Linear search on every render
  getUserName(userId: number): string {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === userId) {
        return this.users[i].name;
      }
    }
    return 'Unknown';
  }

  // CODE SMELL: Duplicate date formatting logic
  formatDate(date: Date): string {
    let d = new Date(date);
    return (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
  }

  // CODE SMELL: Business logic in component
  isOverdue(task: Task): boolean {
    let today = new Date();
    let dueDate = new Date(task.dueDate);
    return dueDate < today && task.status !== 'completed';
  }

  // CODE SMELL: Complex conditional logic for styling
  getTaskClass(task: Task): string {
    let classes = 'task-' + task.priority;
    if (task.status === 'completed') {
      classes = classes + ' task-completed';
    }
    return classes;
  }

  onUserChange() {
    this.applyFilters();
  }

  onStatusChange() {
    this.applyFilters();
  }

  onPriorityChange() {
    this.applyFilters();
  }
}
