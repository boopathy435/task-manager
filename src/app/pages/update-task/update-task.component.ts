import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/models/task.model';
import { User } from 'src/app/models/user.model';
import { TaskManagerService } from 'src/app/services/task-manager.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent implements OnInit {

  form: FormGroup;
  users: User[];
  task: Task;
  constructor(public dialogRef: MatDialogRef<UpdateTaskComponent>, readonly fb: FormBuilder, readonly tmService: TaskManagerService) {
    this.task = this.tmService.getForm;
    this.users = this.tmService.users
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      message: [this.task.message, Validators.required],
      due_date: [new Date(this.task.due_date)],
      priority: [this.task.priority],
      assigned_to: [String(this.task.assigned_to)],
      taskid: [this.task.taskid]
    });
  }

  updateTask() {
    console.log('FOrm ', this.form.value);
    this.form.controls.due_date.setValue(formatDate(this.form.get('due_date').value, 'y-M-d H:m:s', 'en-US'));

    console.log('FOrm1 ', this.form.value);
    this.tmService.updateTask(this.form.value)
  }

}
