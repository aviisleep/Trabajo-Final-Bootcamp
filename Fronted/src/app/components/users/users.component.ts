import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/Services/task.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  task = [];
  constructor(public taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.obtenerUsers().subscribe({
      next: (res) => {
        this.task = res;
      },
      error: (err) => console.log(err)
    })
  }

}
