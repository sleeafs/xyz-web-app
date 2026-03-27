import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskManagerComponent } from './components/task-manager/task-manager.component';

@NgModule({
  declarations: [
    TaskManagerComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    TaskManagerComponent
  ]
})
export class TaskManagementModule { }
