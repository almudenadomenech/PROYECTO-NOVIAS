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
 ){}

 closeConfirmation(): void {
   
  this.showConfirmMessage = false; // Suponiendo que showConfirmMessage controla la visibilidad de un mensaje de confirmación
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
        defaultTime.setHours(12, 0, 0); // Configura la hora por defecto a las 12:00 PM
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
