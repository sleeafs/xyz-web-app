/**
 * Comprehensive interface for user data operations
 * Provides methods for retrieving, filtering, searching, and managing users, tasks, and departments
 *
 * Note: getUsers() and getTasks() return Promises to simulate async HTTP requests
 */
export interface IUserDataProvider {
  
  // Async user retrieval methods (simulates HTTP requests)
  getUsers(): Promise<any[]>;
  getUserById(id: number): any;
  getUserByEmail(email: string): any;

  // Async task retrieval methods (simulates HTTP requests)
  getTasks(): Promise<any[]>;
  getTaskById(id: number): any;
  getTasksByUserId(userId: number): any[];

  // Department retrieval methods
  getDepartments(): any[];
  getDepartmentById(id: number): any;

  // Analytics and statistics methods
  getUserStatistics(userId: number): any;
  getTaskStatistics(taskId: number): any;
  getDepartmentStatistics(deptId: number): any;

  // Filtering and searching methods
  filterUsers(criteria: any): any[];
  searchUsers(query: string): any[];
  filterTasks(criteria: any): any[];
  searchTasks(query: string): any[];

  // User management methods
  addUser(user: any): void;
  updateUser(user: any): void;
  deleteUser(id: number): void;

  // Task management methods
  addTask(task: any): void;
  updateTask(task: any): void;
  deleteTask(id: number): void;

  // Performance calculation methods
  calculateUserPerformance(userId: number): number;
  calculateTeamPerformance(deptId: number): number;
}
