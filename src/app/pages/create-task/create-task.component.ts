import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { TaskManagerService } from 'src/app/services/task-manager.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  form: FormGroup;
  users: User[] = [];
  constructor(public dialogRef: MatDialogRef<CreateTaskComponent>, readonly fb: FormBuilder, readonly tmService: TaskManagerService) {
    this.users = this.tmService.users;
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      message: ['', Validators.required],
      due_date: [],
      priority: [],
      assigned_to: []
    });
  }

  createTask() {
    console.log('FOrm ', this.form.value);
    this.form.controls.due_date.setValue(formatDate(this.form.get('due_date').value, 'y-M-d H:m:s', 'en-US'));

    console.log('FOrm1 ', this.form.value);
    this.tmService.createTask(this.form.value)
  }

}
