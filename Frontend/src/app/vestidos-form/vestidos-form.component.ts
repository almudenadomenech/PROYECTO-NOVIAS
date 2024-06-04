import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Vestido } from '../interfaces/vestido.model';

@Component({
  selector: 'app-vestidos-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, HttpClientModule, NgbAlert],
  templateUrl: './vestidos-form.component.html',
  styleUrl: './vestidos-form.component.css'
})
export class VestidosFormComponent implements OnInit {

  vestidosForm = new FormGroup({

    id: new FormControl(),
   
    coleccion: new FormControl(''),
    price: new FormControl(0, [Validators.min(500), Validators.max(10000)]),
    photoUrl: new FormControl(''),
    descripcion: new FormControl(''),
    corte: new FormControl(''),
    escote: new FormControl(''),
    tipoCola: new FormControl(''),
    tejidos: new FormControl(''),
    espalda: new FormControl(''),
    talle: new FormControl(''),
    tallas: new FormControl('')
    
  });

  vestidos: Vestido |undefined;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  photoFile: File | undefined;
  photoPreview: string | undefined;
  showConfirmMessage = false;

  constructor(
    private httpClient : HttpClient,
    private activatedRoute: ActivatedRoute
  ){}
  
  ngOnInit(): void {
   this.activatedRoute.params.subscribe(params => {
    let id = params['id'];
    if (!id)
      return;

    this.httpClient.get<Vestido>(`http://localhost:3000/vestidos/${id}`)
    .subscribe(vestido => {
      this.isUpdate = true

      this.vestidosForm.reset({
        id: vestido.id,
       
        coleccion: vestido.coleccion,
        price: vestido.price,
        photoUrl: vestido.photoUrl,
        descripcion: vestido.descripcion,
        corte: vestido.corte,
        escote: vestido.escote,
        tipoCola: vestido.tipoCola,
        tejidos: vestido.tejidos,
        espalda: vestido.espalda,
        talle: vestido. talle,
        tallas: vestido.tallas

      });
    });
   });

   this.activatedRoute.params.subscribe(params => {
    let id = params['id'];
    if (id)
      this.httpClient.get<Vestido>(`http://localhost:3000/vestidos/${id}`)
    .subscribe(vestido => {
      this.isDelete = true
    });
   });
  }

  onFileChange(event: Event){
     let target = event.target as HTMLInputElement;

     if (target.files !== null && target.files.length > 0){
      this.photoFile = target.files[0];

      let reader = new FileReader();
      reader.onload = event => this.photoPreview = reader.result as string;
      reader.readAsDataURL(this.photoFile);
     }
  }

  save(): void{

    let formData = new FormData();

    formData.append('id', this.vestidosForm.get('id')?.value ?? 0);
    formData.append('model', this.vestidosForm.get('model')?.value ?? '');
    formData.append('coleccion', this.vestidosForm.get('coleccion')?.value ?? '');
    formData.append('price', this.vestidosForm.get('price')?.value + '');
    formData.append('photoUrl', this.vestidosForm.get('photoUrl')?.value ?? '');
    formData.append('descripcion', this.vestidosForm.get('descripcion')?.value ?? '');
    formData.append('corte', this.vestidosForm.get('corte')?.value ?? '');
    formData.append('escote', this.vestidosForm.get('escote')?.value ?? '');
    formData.append('tipoCola', this.vestidosForm.get('tipoCola')?.value ?? '');
    formData.append('tejidos', this.vestidosForm.get('tejidos')?.value ?? '');
    formData.append('espalda', this.vestidosForm.get('espalda')?.value ?? '');
    formData.append('talle', this.vestidosForm.get('talle')?.value ?? '');
    formData.append('tallas', this.vestidosForm.get('tallas')?.value ?? '');

    if (this.photoFile) formData.append('file', this.photoFile);

    if (this.isUpdate) {
      const id = this.vestidosForm.get('id')?.value;
      this.httpClient.put<Vestido>(`http://localhost:3000/vestidos/${id}`, formData)
        .subscribe(vestido => {
          this.photoFile = undefined;
          this.photoPreview = undefined;
          this.vestidos = vestido;
          this.showConfirmMessage = true;
        },);

    } else {
      this.httpClient.post<Vestido>('http://localhost:3000/vestidos', formData)
        .subscribe(vestido => {
          this.photoFile = undefined;
          this.photoPreview = undefined;
          this.vestidos = vestido;
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
