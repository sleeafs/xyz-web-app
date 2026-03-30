import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';
import { User, Task } from '../../models/user.model';

/**
 * UserService handles user operations
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private dataService: DataService) {}

  /**
   * Gets users with their task statistics
   */
  doIt() {
    const u = this.dataService.getUsers();
    const t = this.dataService.getTasks();
    const r = [];

    // Calculate stats for each user
    for (let i = 0; i < u.length; i++) {
      const user = u[i];
      let completed = 0;
      let inProgress = 0;
      let failed = 0;

      // Count tasks for this user
      for (let j = 0; j < t.length; j++) {
        if (t[j].userId === user.id) {
          if (t[j].status === 'completed') completed++;
          if (t[j].status === 'in-progress') inProgress++;
          if (t[j].status === 'failed') failed++;
        }
      }

      // Calculate performance score
      let score = (completed * 10) + (inProgress * 5) - (failed * 15);

      // Apply role multiplier
      if (user.role === 'admin') {
        score = score * 1.5;
      } else if (user.role === 'manager') {
        score = score * 1.3;
      } else if (user.role === 'user') {
        score = score * 1.0;
      }

      // Convert to rating
      let rating = 25;
      if (score >= 100) rating = 100;
      else if (score >= 50) rating = 75;
      else if (score >= 25) rating = 50;

      r.push({
        ...user,
        tasksCompleted: completed,
        tasksInProgress: inProgress,
        tasksFailed: failed,
        performanceScore: rating
      });
    }

    return r;
  }

  /**
   * Filters users by type
   */
  filterUsers(filterType: string) {
    const u = this.dataService.getUsers();
    const r = [];

    if (filterType === 'active') {
      for (let i = 0; i < u.length; i++) {
        if (u[i].status === 'active') r.push(u[i]);
      }
    } else if (filterType === 'inactive') {
      for (let i = 0; i < u.length; i++) {
        if (u[i].status === 'inactive') r.push(u[i]);
      }
    } else if (filterType === 'admin') {
      for (let i = 0; i < u.length; i++) {
        if (u[i].role === 'admin') r.push(u[i]);
      }
    } else if (filterType === 'manager') {
      for (let i = 0; i < u.length; i++) {
        if (u[i].role === 'manager') r.push(u[i]);
      }
    } else {
      return u;
    }

    return r;
  }
}
