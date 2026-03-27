import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { DataService } from './data.service';

// CODE SMELL: Minimal test coverage
// QUESTION FOR CANDIDATE: How would you test the performance-critical methods?

describe('UserService', () => {
  let service: UserService;
  let dataService: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
    dataService = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TODO: Add tests for:
  // - getUsersWithTaskStats() - including performance characteristics
  // - getUserTasksByStatus()
  // - calculateUserPerformanceScore() - test all branches
  // - getUsersByType() - test all types
  // - findUsersWithCommonTasks()

  // QUESTION: How would you test the O(n²) nested loop issue?
  // HINT: Create test with large dataset and measure execution time
});
