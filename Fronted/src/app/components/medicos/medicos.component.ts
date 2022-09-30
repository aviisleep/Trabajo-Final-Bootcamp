import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/Services/task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'


@Component({
  selector: 'medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {

  Doctors = [];
  constructor(public taskService: TaskService, private ruta: Router) { }

  ngOnInit(): void {
    this.taskService.obtenerDoctors().subscribe({
      next: (res) => {
        this.Doctors = res;
      },
      error: (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.ruta.navigate(['/login']);
          }
        }
      }
    });
  }

}
