export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  department: string;
  joinDate: Date;
  salary: number;
  tasksCompleted?: number;
  tasksInProgress?: number;
  tasksFailed?: number;
  performanceScore?: number;
}

export interface Task {
  id: number;
  userId: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: Date;
  createdAt: Date;
}

export interface Department {
  id: number;
  name: string;
  budget: number;
}
