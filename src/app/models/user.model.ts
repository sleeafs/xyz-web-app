export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  department: string;
  joinDate: Date;
  salary: number;
  tasksCompleted: number;
  tasksInProgress: number;
  tasksFailed: number;
}

export interface Task {
  id: number;
  userId: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  createdAt: Date;
}

export interface Department {
  id: number;
  name: string;
  budget: number;
}
