import { Component, OnInit } from '@angular/core';
import { GestionService } from 'src/app/Services/gestion.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  constructor(public servicio: GestionService, private ruta: Router) { }


  ngOnInit(): void {
    this.listadoUsuarios();
  }

  listadoUsuarios() {
    this.servicio.obtenerUsuarios().subscribe({
      next: (res) => {
        this.servicio.documents = res;
      },
      error: (err) => console.log(err),
    });
  }

  agregarUsuario(form: NgForm) {
    this.servicio.registroUsuario(form.value).subscribe({
    next: (res) => {
    console.log(res);
    localStorage.setItem('token', res.token);
    this.ruta.navigate(['/login']);
    this.listadoUsuarios();
    form.reset(); 
    },
    error: (err) => console.log(err)
    });
    }

}
