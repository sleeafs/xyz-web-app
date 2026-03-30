/**
 * Interface for user data operations
 * Provides methods for retrieving, filtering, searching, and managing users, tasks, and departments
 */
export interface IUserDataProvider {

  // User retrieval methods
  getUsers(): any[];
  getUserById(id: number): any;
  getUserByEmail(email: string): any;

  // Task retrieval methods
  getTasks(): any[];
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
