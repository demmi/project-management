import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup-page',
  templateUrl: './login-signup-page.component.html',
  styleUrls: ['./login-signup-page.component.scss'],
})
export class LoginSignupPageComponent implements OnInit {

  isLoginPage: boolean;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isLoginPage = this.router.url.includes('/login');
  }

}
