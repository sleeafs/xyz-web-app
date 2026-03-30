import { Injectable } from '@angular/core';
import { User, Task, Department } from '../../models/user.model';
import { IUserDataProvider } from '../interfaces/i-user-data-provider.interface';

/**
 * DataService provides access to user, task, and department data
 */
@Injectable({
  providedIn: 'root'
})
export class DataService implements IUserDataProvider {
  
  users: User[] = this.generateMockUsers();
  tasks: Task[] = this.generateMockTasks();
  departments: Department[] = this.generateMockDepartments();

  constructor() {}
  
  /**
   * Gets all users
   */
  getUsers(): User[] {
    return this.users;
  }

  /**
   * Gets all tasks
   */
  getTasks(): Task[] {
    return this.tasks;
  }
  
  /**
   * Gets departments
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


  //Mock Data. No refactoring needed for exercise.
  /**
   * Generates mock users
   */
  private generateMockUsers(): User[] {
    return [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active', department: 'Engineering', joinDate: new Date('2020-01-15'), salary: 95000 },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active', department: 'Engineering', joinDate: new Date('2021-03-20'), salary: 85000 },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user', status: 'inactive', department: 'Marketing', joinDate: new Date('2019-07-10'), salary: 75000 },
      { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'manager', status: 'active', department: 'Engineering', joinDate: new Date('2018-11-05'), salary: 110000 },
      { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'user', status: 'active', department: 'Sales', joinDate: new Date('2022-02-14'), salary: 70000 },
      { id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'user', status: 'active', department: 'Engineering', joinDate: new Date('2021-09-01'), salary: 88000 },
      { id: 7, name: 'Edward Norton', email: 'edward@example.com', role: 'user', status: 'inactive', department: 'Marketing', joinDate: new Date('2020-05-20'), salary: 72000 },
      { id: 8, name: 'Fiona Green', email: 'fiona@example.com', role: 'manager', status: 'active', department: 'Sales', joinDate: new Date('2019-12-10'), salary: 105000 },
    ];
  }

  //Mock Data. No refactoring needed for exercise.
  /**
   * Generates mock tasks matching user statistics
   */
  private generateMockTasks(): Task[] {
    return [
      // User 1 (John Doe - admin): 4 completed → score: 40 * 1.5 = 60 → rating 75
      { id: 1, userId: 1, title: 'Fix login bug', description: 'Completed task', status: 'completed', priority: 'high', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },
      { id: 2, userId: 1, title: 'Update API docs', description: 'Completed task', status: 'completed', priority: 'high', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },
      { id: 3, userId: 1, title: 'Security audit', description: 'Completed task', status: 'completed', priority: 'high', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },
      { id: 4, userId: 1, title: 'Deploy hotfix', description: 'Completed task', status: 'completed', priority: 'high', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },

      // User 2 (Jane Smith - user): 3 completed → score: 30 → rating 50
      { id: 5, userId: 2, title: 'Code review PR #234', description: 'Completed task', status: 'completed', priority: 'medium', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },
      { id: 6, userId: 2, title: 'Unit tests', description: 'Completed task', status: 'completed', priority: 'medium', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },
      { id: 7, userId: 2, title: 'Feature implementation', description: 'Completed task', status: 'completed', priority: 'medium', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },

      // User 3 (Bob Johnson - user): 5 completed, 1 failed → score: 50 - 15 = 35 → rating 50
      { id: 8, userId: 3, title: 'Marketing campaign Q1', description: 'Completed task', status: 'completed', priority: 'medium', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },
      { id: 9, userId: 3, title: 'Email newsletter', description: 'Completed task', status: 'completed', priority: 'medium', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },
      { id: 10, userId: 3, title: 'Social media posts', description: 'Completed task', status: 'completed', priority: 'medium', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },
      { id: 11, userId: 3, title: 'Analytics report', description: 'Completed task', status: 'completed', priority: 'medium', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },
      { id: 12, userId: 3, title: 'Blog content', description: 'Completed task', status: 'completed', priority: 'medium', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },
      { id: 13, userId: 3, title: 'Campaign launch', description: 'Failed task', status: 'failed', priority: 'high', dueDate: new Date('2026-03-10'), createdAt: new Date('2026-03-05') },

      // User 4 (Alice Williams - manager): 8 completed → score: 80 * 1.3 = 104 → rating 100
      { id: 14, userId: 4, title: 'Team planning Q2', description: 'Completed task', status: 'completed', priority: 'high', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },
      { id: 15, userId: 4, title: 'Performance reviews', description: 'Completed task', status: 'completed', priority: 'high', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },
      { id: 16, userId: 4, title: 'Sprint retrospective', description: 'Completed task', status: 'completed', priority: 'high', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },
      { id: 17, userId: 4, title: 'Stakeholder meeting', description: 'Completed task', status: 'completed', priority: 'high', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },
      { id: 18, userId: 4, title: 'Budget planning', description: 'Completed task', status: 'completed', priority: 'high', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },
      { id: 19, userId: 4, title: 'Hiring interviews', description: 'Completed task', status: 'completed', priority: 'high', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },
      { id: 20, userId: 4, title: 'Architecture review', description: 'Completed task', status: 'completed', priority: 'high', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },
      { id: 21, userId: 4, title: 'OKR planning', description: 'Completed task', status: 'completed', priority: 'high', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },

      // User 5 (Charlie Brown - user): 2 completed → score: 20 → rating 25
      { id: 22, userId: 5, title: 'Sales report Q1', description: 'Completed task', status: 'completed', priority: 'medium', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },
      { id: 23, userId: 5, title: 'Client follow-ups', description: 'Completed task', status: 'completed', priority: 'medium', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },

      // User 6 (Diana Prince - user): 5 completed → score: 50 → rating 75
      { id: 24, userId: 6, title: 'Database optimization', description: 'Completed task', status: 'completed', priority: 'medium', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },
      { id: 25, userId: 6, title: 'API refactoring', description: 'Completed task', status: 'completed', priority: 'medium', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },
      { id: 26, userId: 6, title: 'Performance tuning', description: 'Completed task', status: 'completed', priority: 'medium', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },
      { id: 27, userId: 6, title: 'Bug fixes', description: 'Completed task', status: 'completed', priority: 'medium', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },
      { id: 28, userId: 6, title: 'Code cleanup', description: 'Completed task', status: 'completed', priority: 'medium', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },

      // User 7 (Edward Norton - user): 4 completed, 1 failed → score: 40 - 15 = 25 → rating 50
      { id: 29, userId: 7, title: 'Market analysis', description: 'Completed task', status: 'completed', priority: 'medium', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },
      { id: 30, userId: 7, title: 'Competitor research', description: 'Completed task', status: 'completed', priority: 'medium', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },
      { id: 31, userId: 7, title: 'Content creation', description: 'Completed task', status: 'completed', priority: 'medium', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },
      { id: 32, userId: 7, title: 'SEO optimization', description: 'Completed task', status: 'completed', priority: 'medium', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },
      { id: 33, userId: 7, title: 'Social media campaign', description: 'Failed task', status: 'failed', priority: 'high', dueDate: new Date('2026-03-10'), createdAt: new Date('2026-03-05') },

      // User 8 (Fiona Green - manager): 4 completed → score: 40 * 1.3 = 52 → rating 75
      { id: 34, userId: 8, title: 'Sales strategy Q2', description: 'Completed task', status: 'completed', priority: 'high', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },
      { id: 35, userId: 8, title: 'Team training', description: 'Completed task', status: 'completed', priority: 'high', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },
      { id: 36, userId: 8, title: 'Pipeline review', description: 'Completed task', status: 'completed', priority: 'high', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },
      { id: 37, userId: 8, title: 'Revenue forecast', description: 'Completed task', status: 'completed', priority: 'high', dueDate: new Date('2026-03-15'), createdAt: new Date('2026-03-01') },
    ];
  }
  
  //Mock Data. No refactoring needed for exercise.
  /**
   * Generates mock departments
   */
  private generateMockDepartments(): Department[] {
    return [
      { id: 1, name: 'Engineering', budget: 500000 },
      { id: 2, name: 'Marketing', budget: 300000 },
      { id: 3, name: 'Sales', budget: 400000 },
    ];
  }
}
