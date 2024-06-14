import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Category } from '../interfaces/category.model';
import { Vestido } from '../interfaces/vestido.model';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.service';
import { ImageService } from '../shared/image.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.css'
})
export class CategoryDetailComponent implements OnInit{

  category: Category | undefined;
  vestidos: Vestido[] = [];
  isAdmin = false;
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
   this.activatedRoute.params.subscribe(params => {
    const id = params['id'];
    if(!id){
      return;
    }

    this.httpClient.get<Category>('http://localhost:3000/category/' + id)
    .subscribe(category => this.category = category);
   // console.log(this.category);
    
    this.httpClient.get<Vestido[]>('http://localhost:3000/vestidos/filter-by-category-id/'+ id)
      .subscribe(vestidos => this.vestidos = vestidos);
   });
  }

  deleteById(vestido: Vestido){
   
    this.httpClient.delete<Vestido>('http://localhost:3000/vestidos/' + vestido.id)
      .subscribe(() => {
       this.showConfirmMessage = true;
       
      });
}

}
