/* import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Vestido } from '../interfaces/vestido.model';

@Component({
  selector: 'app-vestidos-list',
  standalone: true,
  imports: [HttpClientModule, RouterLink],
  templateUrl: './vestidos-list.component.html',
  styleUrl: './vestidos-list.component.css'
})
export class VestidosListComponent implements OnInit {

  vestidos: Vestido [] = [];

  constructor(private httpClient: HttpClient){}

  ngOnInit(): void {
   this.httpClient.get<Vestido[]>('http://localhost:3000/vestidos')
   .subscribe(vestidos => this.vestidos = vestidos);
  }

} */
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Vestido } from '../interfaces/vestido.model';
import { ImageService } from '../shared/image.service';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-vestidos-list',
  standalone: true,
  imports: [HttpClientModule, RouterLink, NgbAlert],
  templateUrl: './vestidos-list.component.html',
  styleUrls: ['./vestidos-list.component.css']
})
export class VestidosListComponent implements OnInit {

  vestidos: Vestido [] = [];
  baseUrl: string;
  isAdmin = false;
  showConfirmMessage = false;
  private modalService = inject(NgbModal);

  constructor(private httpClient: HttpClient, private imageService: ImageService,
    private authService: AuthenticationService) {
    this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin)
    this.baseUrl = this.imageService.getBaseUrl();
  }
  openModal(content: TemplateRef<any>, vestido: Vestido){
    const modalRef = this.modalService.open(content, {
      centered: true
    });
    modalRef.result.then(result => {
      if(result === 'Aceptar'){
        console.log('Ha pulsado borrar vestido');
        this.deleteById(vestido);
        
      }
    });
  }
  ngOnInit(): void {
    this.loadVestidos();
  }
  
  loadVestidos(): void{
    this.httpClient.get<Vestido[]>('http://localhost:3000/vestidos')
      .subscribe(vestidos => this.vestidos = vestidos);
  }

  deleteById(vestido: Vestido){
   
    this.httpClient.delete<Vestido>('http://localhost:3000/vestidos/' + vestido.id)
      .subscribe(() => {
       this.showConfirmMessage = true;
       this.loadVestidos();
      });
}
}
