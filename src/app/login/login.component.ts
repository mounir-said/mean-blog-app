import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  author = {
    email: '',
    password: ''
  };

  constructor(private _auth: AuthService, private router: Router) {}

  login() {
    this._auth.login(this.author)
      .subscribe(
        (res: any) => {
          const token = res.myToken;
          localStorage.setItem('token', token);
          this.router.navigate(['/home']);
        },
        err => {
          // Handle errors gracefully, e.g., display a user-friendly message
          console.log('Login error:', err);
          // You might also want to show an error message to the user
        }
      );
  }
}
