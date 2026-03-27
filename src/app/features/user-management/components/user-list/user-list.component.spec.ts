import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';

// CODE SMELL: Empty test file
// QUESTION FOR CANDIDATE: How would you test component inputs/outputs?

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Add tests for:
  // - canEdit() business rules
  // - canDelete() business rules
  // - Event emissions
  // - Input handling

  // QUESTION: Are the business rules testable?
  // HINT: Consider moving to a service
});
