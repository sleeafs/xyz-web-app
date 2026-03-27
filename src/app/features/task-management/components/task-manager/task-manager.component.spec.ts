import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskManagerComponent } from './task-manager.component';
import { FormsModule } from '@angular/forms';

// CODE SMELL: Empty test file
// QUESTION FOR CANDIDATE: How would you test filtering logic?

describe('TaskManagerComponent', () => {
  let component: TaskManagerComponent;
  let fixture: ComponentFixture<TaskManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskManagerComponent],
      imports: [FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Add tests for:
  // - Filter by user
  // - Filter by status
  // - Filter by priority
  // - Count by status
  // - Get user name
  // - Format date
  // - Is overdue calculation
  // - Get task class

  // QUESTION: Why is this component hard to test?
  // HINT: Business logic should be in services, not components
});
