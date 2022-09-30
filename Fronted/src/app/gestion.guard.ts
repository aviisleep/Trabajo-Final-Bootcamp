import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { GestionService } from './Services/gestion.service';
import { Router } from '@angular/router'


@Injectable({
  providedIn: 'root'
})
export class GestionGuard implements CanActivate {

constructor(public servicio: GestionService, private ruta: Router){

}

  canActivate(): boolean {
    if (this.servicio.usuarioLogeado()){
    return true;
    }

    this.ruta.navigate(["/login"]);
    return false;
  }
   
   
  
}
