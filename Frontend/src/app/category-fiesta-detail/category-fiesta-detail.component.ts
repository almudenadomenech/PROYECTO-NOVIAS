import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoryFiesta } from '../interfaces/categoryFiesta.model';
import { VestidoFiesta } from '../interfaces/vestido-fiesta.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ImageService } from '../shared/image.service';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-category-fiesta-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category-fiesta-detail.component.html',
  styleUrl: './category-fiesta-detail.component.css'
})
export class CategoryFiestaDetailComponent implements OnInit{
 
  categoryFiesta: CategoryFiesta | undefined;
  vestidosFiesta: VestidoFiesta[] = [];
  isAdmin= false;
  baseUrl: string;
  showConfirmMessage = false;
  private modalService = inject(NgbModal);
  
  constructor(private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private imageService: ImageService
  ) {
    this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin)
    this.baseUrl = this.imageService.getBaseUrl();
  }

  openModal(content: TemplateRef<any>, vestidoFiesta: VestidoFiesta){
    const modalRef = this.modalService.open(content, {
      centered: true
    });
    modalRef.result.then(result => {
      if(result === 'Aceptar'){
        console.log('Ha pulsado borrar vestido');
        this.deleteById(vestidoFiesta);
        
      }
    });
  }
  ngOnInit(): void {
   this.activatedRoute.params.subscribe(params => {
    const id = params['id'];
    if(!id){
      return;
    }

    this.httpClient.get<CategoryFiesta>('http://localhost:3000/category-fiesta/' + id)
    .subscribe(categoryFiesta => this.categoryFiesta = categoryFiesta);
   // console.log(this.category);
    
    this.httpClient.get<VestidoFiesta[]>('http://localhost:3000/vestidos-fiesta/filter-by-categoryFiesta-id/'+ id)
      .subscribe(vestidosFiesta => this.vestidosFiesta = vestidosFiesta);
   });
  }

  deleteById(vestidoFiesta: VestidoFiesta){
   
    this.httpClient.delete<VestidoFiesta>('http://localhost:3000/vestidos-fiesta/' + vestidoFiesta.id)
      .subscribe(() => {
       this.showConfirmMessage = true;
       
      });
}

}
