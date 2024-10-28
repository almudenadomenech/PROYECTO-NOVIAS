import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from '../interfaces/user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgbDropdownModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
collapsed=  true;
isLoggedIn = false;
user: User | undefined;
userEmail: string | undefined;
isAdmin = false;
isUser = false;



constructor(private authService: AuthenticationService, private httpClient: HttpClient,
  private router: Router
){
  this.authService.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  this.authService.userEmail.subscribe(userEmail => this.userEmail = userEmail);
  this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
  this.authService.isUser.subscribe(isUser => this.isUser = isUser);

}
ngOnInit(): void {
  this.httpClient.get<User>('http://localhost:3000/users/account').subscribe(user => {
    this.user = user;

  });
}
  
logout(){
  this.authService.logout();
  this.router.navigate(['/home']);
}
}