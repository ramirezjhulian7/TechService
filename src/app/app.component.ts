import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf, AsyncPipe } from '@angular/common';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TechService';
  constructor(public auth: AuthService, private router: Router) { }

  goLogin() {
    this.router.navigateByUrl('/login');
  }

  goServices() {
    this.router.navigateByUrl('/services');
  }

  goHome() {
    this.router.navigateByUrl('/');
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }
}
