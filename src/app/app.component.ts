import { Component } from '@angular/core';
import { TaskManagerService } from './services/task-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'task-manager';

  constructor(readonly tmService: TaskManagerService) {
    this.tmService.saveUsers();
  }
}
