import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../../models/user.model';

// CODE SMELL: Component tightly coupled to specific data structure
// VIOLATION: Interface Segregation - component needs more than it uses
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  @Input() users: User[] = [];
  @Output() userSelected = new EventEmitter<User>();
  @Output() userDeleted = new EventEmitter<User>();
  @Output() userEdited = new EventEmitter<User>();

  // CODE SMELL: Hardcoded business rules in component
  // VIOLATION: Open/Closed Principle
  canEdit(user: User): boolean {
    // CODE SMELL: Magic strings
    if (user.role === 'admin') {
      return false; // Can't edit admins
    }
    if (user.status === 'inactive') {
      return false; // Can't edit inactive users
    }
    return true;
  }

  // CODE SMELL: Duplicate logic structure
  canDelete(user: User): boolean {
    // CODE SMELL: Magic strings repeated
    if (user.role === 'admin') {
      return false;
    }
    if (user.status === 'inactive') {
      return true;
    }
    // CODE SMELL: Magic number
    if (user.tasksInProgress > 0) {
      return false; // Can't delete users with active tasks
    }
    return true;
  }

  onEdit(user: User) {
    // CODE SMELL: No validation before emitting
    this.userEdited.emit(user);
  }

  onDelete(user: User) {
    // CODE SMELL: Business logic in component
    // Should confirm deletion, check dependencies, etc.
    this.userDeleted.emit(user);
  }

  onViewDetails(user: User) {
    this.userSelected.emit(user);
  }
}
