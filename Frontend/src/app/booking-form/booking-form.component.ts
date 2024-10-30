import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Booking } from '../interfaces/booking.model';
import { HttpClient} from '@angular/common/http';
import { Vestido } from '../interfaces/vestido.model';
import { NgbAlert, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { CurrencyPipe } from '@angular/common';
import { User } from '../interfaces/user.model';
import { timer } from 'rxjs';
import { ImageService } from '../shared/image.service';
import { VestidoFiesta } from '../interfaces/vestido-fiesta.model';


@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink,  NgbDatepickerModule, CurrencyPipe, NgbAlert, CurrencyPipe],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent implements OnInit {
 
 booking: Booking | undefined;
 vestido: Vestido | undefined;
 vestidoFiesta: VestidoFiesta | undefined;
 user: User | undefined;
 showConfirmMessage = false;
 baseUrl: string;


 bookingForm = new FormGroup({

  id: new FormControl(),
  firstName: new FormControl(),
  lastName: new FormControl(),
  email: new FormControl(),
  
  date: new FormControl(new Date()),
  time: new FormControl(),
  
  comment: new FormControl()

 });
  

 constructor(
  private httpClient: HttpClient,
  private activatedRoute: ActivatedRoute,
  private router: Router,
  private imageService: ImageService
  
 ){this.baseUrl = this.imageService.getBaseUrl(); 


 }

 closeConfirmation(): void {
   
  this.showConfirmMessage = false; 
}
ngOnInit(): void {
  this.activatedRoute.params.subscribe(params => {
    const id = params['id'];
    if (!id) return;

    // Obtener vestido
    this.httpClient.get<Vestido>(`http://localhost:3000/vestidos/${id}`).subscribe(
      vestido => {
        this.vestido = vestido; // Almacenar el vestido
      },
      error => {
        console.error('Error al obtener vestido', error);
      }
    );

    // Obtener vestido de fiesta
    this.httpClient.get<VestidoFiesta>(`http://localhost:3000/vestidosFiesta/${id}`).subscribe(
      vestidoFiesta => {
        this.vestidoFiesta = vestidoFiesta; // Almacenar el vestido de fiesta
      },
      error => {
        console.error('Error al obtener vestido de fiesta', error);
      }
    );
  });
}




  save(): void{
     const booking: Booking = {
      id: this.bookingForm.get('id')?.value ?? 0,
      
     
     
      date: this.bookingForm.get('date')?.value ?? new Date(),
      time: this.bookingForm.get('time')?.value ?? (() => {
        const defaultTime = new Date();
        defaultTime.setHours(12, 0, 0);
        return defaultTime;
    })(),
      comment: this.bookingForm.get('comment')?.value ?? '',

      vestidos: this.vestido,
      vestidoFiesta: this.vestidoFiesta

      
     };

     this.httpClient.post<Booking>('http://localhost:3000/booking', booking)
     .subscribe(booking => {
     
       this.showConfirmMessage = true;
       this.booking = booking;
   });
 }
 }
 
