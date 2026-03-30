import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { DataService } from '../data/data.service';

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

  it('should return users', () => {
    const result = service.doIt();
    expect(result).toBeDefined();
  });

  it('should filter active users', () => {
    const result = service.filterUsers('active');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should filter admin users', () => {
    const result = service.filterUsers('admin');
    expect(result.length).toBe(1);
  });
});
