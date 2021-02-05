import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskManagerService } from 'src/app/services/task-manager.service';
import { Task } from 'src/app/models/task.model';
import { UpdateTaskComponent } from '../update-task/update-task.component';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
  tasks: Task[] = [];
  board: Board;
  searchControl = new FormControl();
  dateSort = false;
  constructor(public dialog: MatDialog, readonly tmService: TaskManagerService) {
    this.tmService.saveUsers();
    this.tmService.taskSubject$.subscribe(t => {
      this.tasks = t
      this.getTasks();
    });
    this.tmService.getTasks();
    console.log('this.tasks', this.tasks);
  }

  getImageLink(id) {
    return this.tmService.imageLink(id);
  }

  createTask() {

    const dialogRef = this.dialog.open(CreateTaskComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getTasks() {
    this.board = new Board('Task priority columns', [
      new Column('High', [...this.sort(this.tasks.filter(t => t.priority === 3))]),
      new Column('Mid', [...this.sort(this.tasks.filter(t => t.priority === 2))]),
      new Column('Normal', [...this.sort(this.tasks.filter(t => t.priority === 1))])
    ]);
  }

  sortTasks() {
    this.dateSort = !this.dateSort;
    this.getTasks();
  }

  sort(tasks) {
    return tasks.sort((a, b) => {
      if (this.dateSort) {
        return a.due_date.localeCompare(b.due_date);
      } else {
        return b.due_date.localeCompare(a.due_date);
      }
    })
  }

  updateTask(task: Task) {
    this.tmService.setForm(task);
    const dialogRef = this.dialog.open(UpdateTaskComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteTask(task) {

    this.tmService.deleteTask(task);
  }

  taskSearch() {
    console.log('search', this.searchControl.value);
    this.tmService.searchTask(this.searchControl.value);
  }


  ngOnInit() {

  }

  drop(event: CdkDragDrop<string[]>, name) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.dragDropUpdate(event, name);
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  getPriorityNumber(value) {
    if (value === 'High')
      return 3;
    else if (value === 'Mid')
      return 2;
    else
      return 1;
  }

  dragDropUpdate(event: CdkDragDrop<any>, priority) {
    console.log(event, " ", priority);
    console.log('event.container.data', event.container.data);
    console.log('event.previousContainer.data', event.previousContainer.data);
    const task: Task = event.previousContainer.data[event.previousIndex];
    console.log('task', task);
    task.priority = this.getPriorityNumber(priority);
    this.tmService.updateTask(task);
  }


}