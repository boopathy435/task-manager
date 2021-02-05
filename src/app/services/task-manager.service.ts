import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { User, UsersResponse } from '../models/user.model';
import { of, from, BehaviorSubject } from 'rxjs';
import { tasksResponse } from '../test-data/tasks';
import { Task, TasksResponse } from '../models/task.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {

  private API_KEY = 'O76Gge3dIWVu11VaVvAMVDoKjjyVR7au';
  private headers = new HttpHeaders()
    .set('AuthToken', this.API_KEY);
  private form: Task;
  users: User[] = [];
  tasks: Task[] = [];
  taskStore: Task[] = [];

  taskSubject = new BehaviorSubject<Task[]>([]);
  taskSubject$ = this.taskSubject.asObservable();
  constructor(readonly http: HttpClient) { }

  imageLink(id) {
    return this.users.find(user => user.id == id)?.picture;
  }

  get getForm() {
    return this.form;
  }

  setForm(task) {
    this.form = task;
  }

  getUsers() {
    const url = 'https://devza.com/tests/tasks/listusers';
    return this.http.get<UsersResponse>(url, { headers: this.headers }).pipe(map(res => res.users));
  }

  saveUsers() {
    const url = 'https://devza.com/tests/tasks/listusers';
    this.http.get<UsersResponse>(url, { headers: this.headers }).pipe(map(res => res.users)).subscribe(users => this.users = users);
  }

  createTask(task: Task) {
    const url = 'https://devza.com/tests/tasks/create';

    console.log('task', task);
    const arr = this.taskSubject.value;
    this.taskSubject.next([...arr, { ...task, taskid: arr.length }]);
    this.taskStore = this.taskSubject.value;
    this.http.post(url, task, { headers: this.headers }).subscribe(console.log);
  }

  updateTask(task: Task) {
    const url = 'https://devza.com/tests/tasks/update';

    console.log('task', task);
    const arr = this.taskSubject.value;
    let itemIndex = arr.findIndex(t => t.taskid === task.taskid);
    arr[itemIndex] = task;
    this.taskSubject.next([...arr]);
    this.taskStore = this.taskSubject.value;
    this.http.post(url, task, { headers: this.headers }).subscribe(console.log);
  }

  deleteTask(task: Task) {
    console.log('delete task');
    const url = 'https://devza.com/tests/tasks/delete';
    const arr = this.taskSubject.value;
    this.taskSubject.next([...arr.filter(t => t.taskid != task.taskid)]);
    this.taskStore = this.taskSubject.value;

    this.http.post(url, task, { headers: this.headers }).subscribe(console.log);
  }

  getTasks() {
    const url = 'https://devza.com/tests/tasks/list';
    this.http.get(url, { headers: this.headers }).subscribe(console.log);

    this.tasks = tasksResponse.tasks;

    this.taskSubject.next(this.tasks);
    this.taskStore = this.taskSubject.value;
  }

  searchTask(taskName: string) {
    console.log('searctask service');
    this.taskSubject.next([...this.taskStore.filter(t => t.message.toLowerCase().includes(taskName.trim().toLowerCase()))]);
  }
}
