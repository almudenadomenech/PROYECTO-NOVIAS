import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Booking } from '../interfaces/booking.model';
import { HttpClient} from '@angular/common/http';
import { Vestido } from '../interfaces/vestido.model';
import { NgbAlert, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { CurrencyPipe } from '@angular/common';
import { User } from '../interfaces/user.model';


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
  
  dateTime: new FormControl(new Date()),
  
  comment: new FormControl()

 });
  

 constructor(
  private httpClient: HttpClient,
  private activatedRoute: ActivatedRoute,
  private router: Router
 ){}

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
      
     
     
      dateTime: this.bookingForm.get('dateTime')?.value ?? new Date(),
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
