import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'poverenik-frontend';
  showNavbar = true;

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe((url: any) => {
      if (this.router.url === '/registracija' ||
        this.router.url === '/prijava') {
        this.showNavbar = false;
      } else {
        this.showNavbar = true;
      }
    });
  }
}
