import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user/user.service';
import { DataService } from '../../../../core/services/data/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
  standalone: false
})
export class DashboardComponent implements OnInit {
  title = 'User Management Dashboard';
  usersWithStats: any[] = [];
  filteredUsers: any[] = [];
  loading = true;
  selectedFilter = 'all';

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

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.loading = true;
    this.usersWithStats = this.userService.doIt();
    this.filteredUsers = [...this.usersWithStats];
    this.loading = false;
  }

  onFilterChange(filterValue: string) {
    this.selectedFilter = filterValue;

    if (filterValue === 'all') {
      this.filteredUsers = this.usersWithStats;
    } else {
      this.filteredUsers = this.userService.filterUsers(filterValue);

      // Map back to include performance scores from original data
      this.filteredUsers = this.filteredUsers.map(user => {
        const original = this.usersWithStats.find(u => u.id === user.id);
        return original || user;
      });
    }
  }
  
  getUserPerformanceClass(score: number): string {
    if (score >= 80) return 'high-performer';
    if (score >= 60) return 'medium-performer';
    return 'low-performer';
  }
}
