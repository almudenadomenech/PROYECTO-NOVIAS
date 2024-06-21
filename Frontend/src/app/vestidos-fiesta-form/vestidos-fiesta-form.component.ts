import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { VestidoFiesta } from '../interfaces/vestido-fiesta.model';
import { Category } from '../interfaces/category.model';
import { VestidosFiestaService } from '../services/vestidos-fiesta.service';


@Component({
  selector: 'app-vestidos-fiesta-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterLink, NgbAlert],
  templateUrl: './vestidos-fiesta-form.component.html',
  styleUrl: './vestidos-fiesta-form.component.css'
})
export class VestidosFiestaFormComponent implements OnInit{
  

  category: Category | undefined;
  vestidoFiesta: VestidoFiesta | undefined;
  categories: Category[] = [];

  vestidosFiestaForm = new FormGroup ({
    id: new FormControl(),
    model: new FormControl (''),
    coleccion: new FormControl(''),
    price: new FormControl(0, [Validators.min(500), Validators.max(10000)]),
    photoUrl: new FormControl(''),
    description: new FormControl(''),
    corte: new FormControl(''),
    escote: new FormControl(''),
    mangas: new FormControl(''),
    tejidos: new FormControl(''),
    espalda: new FormControl(''),
    talle: new FormControl(''),
    tallas: new FormControl(''),
    categoryId: new FormControl(), 
  });
  
  vestidosFiesta: VestidoFiesta | undefined;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  photoFile: File | undefined;
  photoPreview: string | undefined;
  showConfirmMessage = false;

  constructor(
    private vestidosFiestaService: VestidosFiestaService,
    private activatedRoute: ActivatedRoute
  ) { }

  closeConfirmation(): void {  
    this.showConfirmMessage = false; // Suponiendo que showConfirmMessage controla la visibilidad de un mensaje de confirmación
  }
  ngOnInit(): void {
    this.loadCategories();

   
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (!id)
        return;

      this.vestidosFiestaService.getVestidoFiesta(id)
        .subscribe(vestidosFiesta => {
          this.isUpdate = true;

          this.vestidosFiestaForm.reset({
            id: vestidosFiesta.id,
            model: vestidosFiesta.model,
            coleccion: vestidosFiesta.coleccion,
            price: vestidosFiesta.price,
            photoUrl: vestidosFiesta.photoUrl,
            description: vestidosFiesta.description,
            corte: vestidosFiesta.corte,
            escote: vestidosFiesta.escote,
            mangas: vestidosFiesta.mangas,
            tejidos: vestidosFiesta.tejidos,
            espalda: vestidosFiesta.espalda,
            talle: vestidosFiesta.talle,
            tallas: vestidosFiesta.tallas,
            categoryId: vestidosFiesta.categoryId // Asignar categoryId
          });
        });
    });

    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id)
        this.vestidosFiestaService.getVestidoFiesta(id)
          .subscribe(vestidoFiesta => {
            this.isDelete = true;
          });
    });
  }

  loadCategories(): void {
    this.vestidosFiestaService.getCategories()
      .subscribe(categories => {
        this.categories = categories;
      });
  }

  onFileChange(event: Event) {
    let target = event.target as HTMLInputElement;

    if (target.files !== null && target.files.length > 0) {
      this.photoFile = target.files[0];

      let reader = new FileReader();
      reader.onload = event => this.photoPreview = reader.result as string;
      reader.readAsDataURL(this.photoFile);
    }
  }

  save(): void {
    let formData = new FormData();

    formData.append('id', this.vestidosFiestaForm.get('id')?.value ?? 0);
    formData.append('model', this.vestidosFiestaForm.get('model')?.value ?? '');
    formData.append('coleccion', this.vestidosFiestaForm.get('coleccion')?.value ?? '');
    formData.append('price', this.vestidosFiestaForm.get('price')?.value + '');
    formData.append('photoUrl', this.vestidosFiestaForm.get('photoUrl')?.value ?? '');
    formData.append('description', this.vestidosFiestaForm.get('description')?.value ?? '');
    formData.append('corte', this.vestidosFiestaForm.get('corte')?.value ?? '');
    formData.append('escote', this.vestidosFiestaForm.get('escote')?.value ?? '');
    formData.append('mangas', this.vestidosFiestaForm.get('mangas')?.value ?? '');
    formData.append('tejidos', this.vestidosFiestaForm.get('tejidos')?.value ?? '');
    formData.append('espalda', this.vestidosFiestaForm.get('espalda')?.value ?? '');
    formData.append('talle', this.vestidosFiestaForm.get('talle')?.value ?? '');
    formData.append('tallas', this.vestidosFiestaForm.get('tallas')?.value ?? '');
    formData.append('categoryId', this.vestidosFiestaForm.get('categoryId')?.value ?? ''); // Añadir categoryId
    if (this.photoFile) formData.append('file', this.photoFile);

    if (this.isUpdate) {
      const id = this.vestidosFiestaForm.get('id')?.value;
      this.vestidosFiestaService.updateVestidoFiesta(id, formData)
        .subscribe(vestidoFiesta => {
          this.photoFile = undefined;
          this.photoPreview = undefined;
          this.vestidosFiesta = vestidoFiesta;
          this.category = this.category;
          this.showConfirmMessage = true;
        });

    } else {
      this.vestidosFiestaService.createVestidoFiesta(formData)
        .subscribe(vestidoFiesta => {
          this.photoFile = undefined;
          this.photoPreview = undefined;
          this.vestidosFiesta = vestidoFiesta;
          this.showConfirmMessage = true;
        });
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o1 && o2) {
      return o1.id === o2.id;
    } else {
      return o1 === o2;
    }
  }
}
