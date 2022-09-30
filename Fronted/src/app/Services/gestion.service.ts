import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario_modelo } from '../models/usuarios';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class GestionService {

  constructor(private http: HttpClient, private ruta: Router) { }

  private URL_API = 'http://localhost:3000';

  documents: Usuario_modelo[] = [];

  datosUser: Usuario_modelo = {
    nombre: "",
    apellido: "",
    correo: "",
    password: "",
  }

  obtenerUsuarios(){
    let peticion  = this.http.get<Usuario_modelo[]>(this.URL_API + '/usuarios')
    return peticion;
  }

  registroUsuario(datos: Usuario_modelo){
    let peticion = this.http.post<any>(this.URL_API + '/registro', datos);
    return peticion
  }

  loginUsuario(datos: Usuario_modelo){
    let peticion = this.http.post<any>(this.URL_API + '/login', datos);
    return peticion
  }

  usuarioLogeado(){
    return !!localStorage.getItem("token")
  }

  getToken(){
    return localStorage.getItem('token');
  }

  cerrarSesion(){
    localStorage.removeItem('token');
    this.ruta.navigate(['/login']);
  }
}
