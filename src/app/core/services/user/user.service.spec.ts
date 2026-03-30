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
  
});
