import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VestidoFiesta } from '../interfaces/vestido-fiesta.model';
import { AuthenticationService } from '../authentication/authentication.service';
import { ImageService } from '../shared/image.service';
import { CategoryFiesta } from '../interfaces/categoryFiesta.model';

@Component({
  selector: 'app-vestidos-fiesta-list',
  standalone: true,
  imports: [HttpClientModule, RouterLink, NgbAlert],
  templateUrl: './vestidos-fiesta-list.component.html',
  styleUrl: './vestidos-fiesta-list.component.css'
})
export class VestidosFiestaListComponent implements OnInit {

  vestidosFiesta: VestidoFiesta [] = [];
  categoriesFiesta: CategoryFiesta[] = [];
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

  openModal(content: TemplateRef<any>, vestidoFiesta: VestidoFiesta){
    const modalRef = this.modalService.open(content, {
      centered: true,
      
    });
    modalRef.result.then(result => {
      if(result === 'Aceptar'){
        console.log('Ha pulsado borrar vestido');
        this.deleteById(vestidoFiesta);
        
      }
    });
  }
  ngOnInit(): void {
    this.httpClient.get<CategoryFiesta[]>('http://localhost:3000/category-fiesta')
    .subscribe(categoriesFiesta => this.categoriesFiesta = categoriesFiesta);
    this.loadVestidosFiesta();
}
loadVestidosFiesta(): void{
  this.httpClient.get<VestidoFiesta[]>('http://localhost:3000/vestidos-fiesta')
    .subscribe( vestidosFiestaFromBackend=> this.vestidosFiesta = vestidosFiestaFromBackend);

}
deleteById(vestidosFiesta: VestidoFiesta){
   
  this.httpClient.delete<VestidoFiesta>('http://localhost:3000/vestidos-fiesta/' + vestidosFiesta.id)
    .subscribe(() => {
     this.showConfirmMessage = true;
     this.loadVestidosFiesta();
    });
}
}
