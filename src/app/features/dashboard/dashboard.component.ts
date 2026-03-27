import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
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
    { value: 'manager', label: 'Managers' },
    { value: 'highPerformer', label: 'High Performers' }
  ];

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.loading = true;
    setTimeout(() => {
      try {
        this.usersWithStats = this.userService.doStuff();
        this.filteredUsers = [...this.usersWithStats];
        console.log('📊 Dashboard loaded:', this.usersWithStats.length, 'users');
      } catch (error) {
        console.error('❌ Error loading dashboard:', error);
        this.usersWithStats = [];
        this.filteredUsers = [];
      } finally {
        this.loading = false;
      }
    }, 100);
  }

  onFilterChange(filterValue: string) {
    this.selectedFilter = filterValue;

    if (filterValue === 'all') {
      this.filteredUsers = this.usersWithStats;
    } else {
      this.filteredUsers = this.userService.filter(filterValue);

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
