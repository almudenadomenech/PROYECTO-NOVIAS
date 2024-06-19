import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../interfaces/user.model';
import { AuthenticationService } from '../authentication/authentication.service';
import { ImageService } from '../shared/image.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink, HttpClientModule, NgbAlert],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{

  users: User [] = [];
  isAdmin = false;
  showConfirmMessage = false;
  baseUrl: string;

  private modalService = inject(NgbModal);

constructor(private httpClient: HttpClient, private imageService: ImageService, private authService: AuthenticationService){
  this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin)
  this.baseUrl = this.imageService.getBaseUrl();
}

closeConfirmation(): void {
   
  this.showConfirmMessage = false; // Suponiendo que showConfirmMessage controla la visibilidad de un mensaje de confirmación
}
openModal(content: TemplateRef<any>, users: User) {
  const modalRef = this.modalService.open(content, {
    centered: true
  });

  modalRef.result.then(result => {
    if (result === 'Aceptar'){
      console.log('Ha pulsado borrar usuario');
      this.deleteById(users);
      
    }
  }); 
} 

ngOnInit(): void {
  this.httpClient.get<User[]>('http://localhost:3000/users')
  .subscribe(users => this.users = users);
  this.loadUsers();
}
loadUsers(): void {
  this.httpClient.get<User[]>('http://localhost:3000/users')
  .subscribe(users => this.users = users);
}
deleteById(user: User){
    
  this.httpClient.delete<User>('http://localhost:3000/users/' + user.id)
    .subscribe(() => {
     this.showConfirmMessage = true;
     this.loadUsers();
     // this.users = this.users.filter(user => user.id !== user.id);
    });
}
}
