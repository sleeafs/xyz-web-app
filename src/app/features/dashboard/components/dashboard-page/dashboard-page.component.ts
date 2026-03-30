import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user/user.service';
import { DataService } from '../../../../core/services/data/data.service';

/**
 * DashboardComponent - Container/Smart Component
 *
 * Container components manage state and orchestrate business logic by calling services.
 * They pass data to presentation components and handle events from them.
 * Container components should be thin orchestration layers with minimal business logic.
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
  standalone: false
})
export class DashboardComponent implements OnInit {
  // View state properties
  title = 'User Management Dashboard';
  usersWithStats: any[] = [];      // All users with calculated statistics
  filteredUsers: any[] = [];       // Filtered subset based on selectedFilter
  loading = true;                  // Loading state for template
  selectedFilter = 'all';          // Currently active filter

  // Filter options displayed in dropdown
  filterOptions = [
    { value: 'all', label: 'All Users' },
    { value: 'active', label: 'Active Users' },
    { value: 'inactive', label: 'Inactive Users' },
    { value: 'admin', label: 'Admins' },
    { value: 'manager', label: 'Managers' }
  ];
  
  constructor(
    private userService: UserService
  ) {}

  /**
   * Lifecycle hook: Initialize component
   * Loads dashboard data on component creation
   */
  ngOnInit() {
    this.loadDashboardData();
  }

  /**
   * Loads all users with their task statistics
   * Sets both master list and filtered list
   */
  loadDashboardData() {
    this.loading = true;
    this.usersWithStats = this.userService.doIt();
    this.filteredUsers = [...this.usersWithStats];
    this.loading = false;
  }

  /**
   * Handles filter selection changes
   * Filters users based on selected criteria
   *
   * Note: This contains business logic that should ideally be in UserService
   *
   * @param filterValue - The filter type (e.g., 'active', 'admin', 'all')
   */
  onFilterChange(filterValue: string) {
    this.selectedFilter = filterValue;

    if (filterValue === 'all') {
      this.filteredUsers = this.usersWithStats;
    } else {
      this.filteredUsers = this.userService.filterUsers(filterValue);
    }
  }

  /**
   * Determines CSS class based on performance score
   * Used for visual styling of user cards
   *
   * Note: This is presentation logic that could be moved to a pipe
   *
   * @param score - Performance score (0-100)
   * @returns CSS class name for styling
   */
  getUserPerformanceClass(score: number): string {
    if (score >= 80) return 'high-performer';
    if (score >= 60) return 'medium-performer';
    return 'low-performer';
  }
}
