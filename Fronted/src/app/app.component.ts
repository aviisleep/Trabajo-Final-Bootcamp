import { Component } from '@angular/core';
import { GestionService } from './Services/gestion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public servicio: GestionService) {}

  title = 'Frontend';
}
