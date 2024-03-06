import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'; // Import Router from Angular router module

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  author = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    about: ''
  };

  image: any;

  constructor(private _auth: AuthService , private router: Router) {}

  register() {
    let fd = new FormData()
    fd.append('firstName', this.author.firstName)
    fd.append('lastName', this.author.lastName) // Fix typo in lastName
    fd.append('email', this.author.email)
    fd.append('password', this.author.password)
    fd.append('about', this.author.about)
    fd.append('image', this.image)

    this._auth.register(fd).subscribe(res => this.router.navigate(['/login'])) // Fix navigation error
  }

  select(e: any) {
    this.image = e.target.files[0];
  }
}
