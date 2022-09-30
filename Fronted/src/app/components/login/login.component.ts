import { Component, OnInit } from '@angular/core';
import { GestionService } from 'src/app/Services/gestion.service';
import { Router } from '@angular/router'


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 

  constructor(public servicio: GestionService, private ruta: Router) { }

  ngOnInit(): void {
  }
  
  validarLogin(){
    this.servicio.loginUsuario(this.servicio.datosUser).subscribe({
      next: (res) =>{
        console.log(res)
        localStorage.setItem('token', res.token);
        this.ruta.navigate(['/user']);
      },
      error: (err) => console.log(err)
    })
  }



}
