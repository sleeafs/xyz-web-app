import { Injectable } from '@angular/core';
import { User, Task, Department } from '../models/user.model';
import { IUserDataProvider } from './i-user-data-provider.interface';

/**
 * DataService provides access to user, task, and department data
 * Simulates async HTTP requests
 */
@Injectable({
  providedIn: 'root'
})
export class DataService implements IUserDataProvider {

  users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active', department: 'Engineering', joinDate: new Date('2020-01-15'), salary: 95000, tasksCompleted: 45, tasksInProgress: 3, tasksFailed: 2 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active', department: 'Engineering', joinDate: new Date('2021-03-20'), salary: 85000, tasksCompleted: 38, tasksInProgress: 5, tasksFailed: 1 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user', status: 'inactive', department: 'Marketing', joinDate: new Date('2019-07-10'), salary: 75000, tasksCompleted: 52, tasksInProgress: 0, tasksFailed: 8 },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'manager', status: 'active', department: 'Engineering', joinDate: new Date('2018-11-05'), salary: 110000, tasksCompleted: 67, tasksInProgress: 4, tasksFailed: 3 },
    { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'user', status: 'active', department: 'Sales', joinDate: new Date('2022-02-14'), salary: 70000, tasksCompleted: 23, tasksInProgress: 6, tasksFailed: 1 },
    { id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'user', status: 'active', department: 'Engineering', joinDate: new Date('2021-09-01'), salary: 88000, tasksCompleted: 31, tasksInProgress: 2, tasksFailed: 0 },
    { id: 7, name: 'Edward Norton', email: 'edward@example.com', role: 'user', status: 'inactive', department: 'Marketing', joinDate: new Date('2020-05-20'), salary: 72000, tasksCompleted: 41, tasksInProgress: 0, tasksFailed: 5 },
    { id: 8, name: 'Fiona Green', email: 'fiona@example.com', role: 'manager', status: 'active', department: 'Sales', joinDate: new Date('2019-12-10'), salary: 105000, tasksCompleted: 58, tasksInProgress: 3, tasksFailed: 2 },
  ];

  tasks: Task[] = [
    { id: 1, userId: 1, title: 'Fix login bug', description: 'Users cannot login', status: 'completed', priority: 'high', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },
    { id: 2, userId: 1, title: 'Update documentation', description: 'Update API docs', status: 'in-progress', priority: 'medium', dueDate: new Date('2026-03-30'), createdAt: new Date('2026-03-10') },
    { id: 3, userId: 2, title: 'Code review', description: 'Review PR #234', status: 'completed', priority: 'medium', dueDate: new Date('2026-03-20'), createdAt: new Date('2026-03-12') },
    { id: 4, userId: 2, title: 'Design new feature', description: 'Design user dashboard', status: 'in-progress', priority: 'high', dueDate: new Date('2026-04-01'), createdAt: new Date('2026-03-15') },
    { id: 5, userId: 3, title: 'Marketing campaign', description: 'Launch Q2 campaign', status: 'pending', priority: 'low', dueDate: new Date('2026-04-15'), createdAt: new Date('2026-03-20') },
    { id: 6, userId: 4, title: 'Team meeting', description: 'Quarterly planning', status: 'completed', priority: 'medium', dueDate: new Date('2026-03-25'), createdAt: new Date('2026-03-18') },
    { id: 7, userId: 5, title: 'Sales report', description: 'Prepare Q1 report', status: 'in-progress', priority: 'high', dueDate: new Date('2026-03-28'), createdAt: new Date('2026-03-22') },
  ];

  departments: Department[] = [
    { id: 1, name: 'Engineering', budget: 500000 },
    { id: 2, name: 'Marketing', budget: 300000 },
    { id: 3, name: 'Sales', budget: 400000 },
  ];

  constructor() {}

  /**
   * ASYNC: Fetches all users - simulates HTTP request with delay
   */
  getUsers(): Promise<User[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.users), 50);
    });
  }

  /**
   * ASYNC: Fetches all tasks - simulates HTTP request with delay
   */
  getTasks(): Promise<Task[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.tasks), 75);
    });
  }

  /**
   * Gets departments - synchronous for simplicity
   */
  getDepartments() {
    return this.departments;
  }

  // Additional methods required by IUserDataProvider interface
  getUserById(id: number): any {
    throw new Error('Method not implemented');
  }

  getUserByEmail(email: string): any {
    throw new Error('Method not implemented');
  }

  getTaskById(id: number): any {
    throw new Error('Method not implemented');
  }

  getTasksByUserId(userId: number): any[] {
    throw new Error('Method not implemented');
  }

  getDepartmentById(id: number): any {
    throw new Error('Method not implemented');
  }

  getUserStatistics(userId: number): any {
    throw new Error('Method not implemented');
  }

  getTaskStatistics(taskId: number): any {
    throw new Error('Method not implemented');
  }

  getDepartmentStatistics(deptId: number): any {
    throw new Error('Method not implemented');
  }

  filterUsers(criteria: any): any[] {
    throw new Error('Method not implemented');
  }

  searchUsers(query: string): any[] {
    throw new Error('Method not implemented');
  }

  filterTasks(criteria: any): any[] {
    throw new Error('Method not implemented');
  }

  searchTasks(query: string): any[] {
    throw new Error('Method not implemented');
  }

  addUser(user: any): void {
    throw new Error('Method not implemented');
  }

  updateUser(user: any): void {
    throw new Error('Method not implemented');
  }

  deleteUser(id: number): void {
    throw new Error('Method not implemented');
  }

  addTask(task: any): void {
    throw new Error('Method not implemented');
  }

  updateTask(task: any): void {
    throw new Error('Method not implemented');
  }

  deleteTask(id: number): void {
    throw new Error('Method not implemented');
  }

  calculateUserPerformance(userId: number): number {
    throw new Error('Method not implemented');
  }

  calculateTeamPerformance(deptId: number): number {
    throw new Error('Method not implemented');
  }
}
