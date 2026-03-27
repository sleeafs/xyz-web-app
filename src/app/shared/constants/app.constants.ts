// CODE SMELL: This file exists but constants are not being used
// VIOLATION: Magic strings and numbers are hardcoded throughout the application
// QUESTION FOR CANDIDATE: Why aren't these constants being used?

// User roles
export enum UserRole {
  Admin = 'admin',
  Manager = 'manager',
  User = 'user'
}

// User status
export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive'
}

// Task status
export enum TaskStatus {
  Pending = 'pending',
  InProgress = 'in-progress',
  Completed = 'completed',
  Failed = 'failed'
}

// Task priority
export enum TaskPriority {
  Low = 'low',
  Medium = 'medium',
  High = 'high'
}

// Performance score weights
export const PERFORMANCE_WEIGHTS = {
  TASK_COMPLETED: 10,
  TASK_IN_PROGRESS: 5,
  TASK_FAILED: -15
} as const;

// Role multipliers for performance calculation
export const ROLE_MULTIPLIERS: Record<UserRole, number> = {
  [UserRole.Admin]: 1.5,
  [UserRole.Manager]: 1.3,
  [UserRole.User]: 1.0
} as const;

// Performance score thresholds
export const SCORE_THRESHOLDS = {
  EXCELLENT: 1000,
  GOOD: 500,
  AVERAGE: 250,
  POOR: 0
} as const;

// Performance score ratings
export const PERFORMANCE_RATINGS = {
  EXCELLENT: 100,
  GOOD: 75,
  AVERAGE: 50,
  POOR: 25
} as const;
