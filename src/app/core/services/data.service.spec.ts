import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return users', () => {
    const users = service.getUsers();
    expect(users.length).toBeGreaterThan(0);
  });

  it('should return tasks', () => {
    const tasks = service.getTasks();
    expect(tasks.length).toBeGreaterThan(0);
  });

  it('should return departments', () => {
    const departments = service.getDepartments();
    expect(departments.length).toBeGreaterThan(0);
  });

  // QUESTION FOR CANDIDATE: What's wrong with exposing mutable arrays?
  // HINT: Consider immutability
});
