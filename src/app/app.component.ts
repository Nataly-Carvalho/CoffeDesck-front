import { Component } from '@angular/core';
import { AuthService } from './sevice/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CoffeeDesk-front';

  constructor(
    public auth:AuthService
  ){}
}
