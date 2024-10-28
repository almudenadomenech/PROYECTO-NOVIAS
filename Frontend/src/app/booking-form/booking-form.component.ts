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
      if(!id) return;

      this.httpClient.get<Vestido>(`http://localhost:3000/vestidos/${id}`).subscribe(vestido => {
        this.vestido = vestido;
        
      });

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

      
     };

     this.httpClient.post<Booking>('http://localhost:3000/booking', booking)
     .subscribe(booking => {
     
       this.showConfirmMessage = true;
       this.booking = booking;
   });
 }
 }
 
 /* import { Component, OnInit } from '@angular/core';
 import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
 import { ActivatedRoute, Router, RouterLink } from '@angular/router';
 import { Booking } from '../interfaces/booking.model';
 import { HttpClient } from '@angular/common/http';
 import { Vestido } from '../interfaces/vestido.model';
 import { NgbAlert, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
 import { CurrencyPipe } from '@angular/common';
 import { User } from '../interfaces/user.model';
 
 @Component({
   selector: 'app-booking-form',
   standalone: true,
   imports: [ReactiveFormsModule, RouterLink, NgbDatepickerModule, CurrencyPipe, NgbAlert],
   templateUrl: './booking-form.component.html',
   styleUrls: ['./booking-form.component.css']
 })
 export class BookingFormComponent implements OnInit {
  
   booking: Booking | undefined;
   vestido: Vestido | undefined;
   user: User | undefined;
   showConfirmMessage = false;
   reservationError = false; // Variable para mostrar mensaje de error
 
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
     private router: Router
   ) {}
 
   closeConfirmation(): void {
     this.showConfirmMessage = false;
     this.reservationError = false; // Cerrar el mensaje de error
   }
 
   ngOnInit(): void {
     this.activatedRoute.params.subscribe(params => {
       const id = params['id'];
       if (!id) return;
 
       this.httpClient.get<Vestido>(`http://localhost:3000/vestidos/${id}`).subscribe(vestido => {
         this.vestido = vestido;
       });
     });
   }
 
   save(): void {
     const bookingTime = this.bookingForm.get('time')?.value;
 
     // Convertir el tiempo a formato adecuado
     const timeString = bookingTime.toISOString().split('T')[1].split('.')[0]; // HH:mm:ss
 
     this.checkAvailability(timeString).subscribe(response => {
       if (response.available) {
         const booking: Booking = {
           id: this.bookingForm.get('id')?.value ?? 0,
           date: this.bookingForm.get('date')?.value ?? new Date(),
           time: bookingTime,
           comment: this.bookingForm.get('comment')?.value ?? '',
           vestidos: this.vestido
         };
 
         this.httpClient.post<Booking>('http://localhost:3000/booking', booking)
           .subscribe(booking => {
             this.showConfirmMessage = true;
             this.booking = booking;
           });
       } else {
         this.reservationError = true; // Mostrar mensaje de error si la hora está ocupada
       }
     });
   }
 
   checkAvailability(time: string) {
     return this.httpClient.get<{ available: boolean }>('http://localhost:3000/booking/check-availability', {
       params: { time }
     });
   }
 }
  */