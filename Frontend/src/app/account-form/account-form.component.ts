import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgbAlert, RouterLink],
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit {

  user: User | undefined;
  showConfirmMessage = false;
  isAdmin = false;
  isLoggedIn = false;
  
  userForm = new FormGroup({
    id: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    phone: new FormControl(),
    nif: new FormControl(),
    street: new FormControl(),
    city: new FormControl(),
    postalCode: new FormControl(),
    photoUrl: new FormControl()
  });

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
    this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
  }

  closeConfirmation(): void {
    this.showConfirmMessage = false;
  }

  ngOnInit(): void {
    this.httpClient.get<User>('http://localhost:3000/users/account').subscribe(user => {
      this.user = user;
      this.userForm.reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        nif: user.nif,
        password: user.password,
        phone: user.phone,
        street: user.street,
        city: user.city,
        postalCode: user.postalCode,
        photoUrl: user.photoUrl
      });
    });
  }

  save(): void {
    if (!this.user) return;
    this.user.firstName = this.userForm.get('firstName')?.value;
    this.user.lastName = this.userForm.get('lastName')?.value;
    this.user.phone = this.userForm.get('phone')?.value;
    this.user.nif = this.userForm.get('nif')?.value;
    this.user.street = this.userForm.get('street')?.value;
    this.user.city = this.userForm.get('city')?.value;
    this.user.postalCode = this.userForm.get('postalCode')?.value;

    this.httpClient.put('http://localhost:3000/users', this.user)
      .subscribe(data => {
        this.showConfirmMessage = true;
      });
  }
}
