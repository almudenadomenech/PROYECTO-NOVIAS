 
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Vestido } from '../interfaces/vestido.model';
import { ImageService } from '../shared/image.service';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../authentication/authentication.service';
import { Category } from '../interfaces/category.model';

@Component({
  selector: 'app-vestidos-list',
  standalone: true,
  imports: [HttpClientModule, RouterLink, NgbAlert],
  templateUrl: './vestidos-list.component.html',
  styleUrls: ['./vestidos-list.component.css']
})
export class VestidosListComponent implements OnInit {

  vestidos: Vestido [] = [];
  categories: Category[] = [];
  baseUrl: string;
  isAdmin = false;
  showConfirmMessage = false;
  private modalService = inject(NgbModal);

  constructor(private httpClient: HttpClient, private imageService: ImageService,
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
  private router: Router) {
    this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin)
    this.baseUrl = this.imageService.getBaseUrl();
  }

  closeConfirmation(): void {
   
    this.showConfirmMessage = false; // Suponiendo que showConfirmMessage controla la visibilidad de un mensaje de confirmación
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

    this.httpClient.get<Category[]>('http://localhost:3000/category')
    .subscribe(categories => this.categories = categories);
    this.loadVestidos();
   
  } 

 

  loadVestidos(): void{
    this.httpClient.get<Vestido[]>('http://localhost:3000/vestidos')
      .subscribe( vestidosFromBackend=> this.vestidos = vestidosFromBackend);

   
  }

  deleteById(vestido: Vestido){
   
    this.httpClient.delete<Vestido>('http://localhost:3000/vestidos/' + vestido.id)
      .subscribe(() => {
       this.showConfirmMessage = true;
       this.loadVestidos();
      });
}
}
 
