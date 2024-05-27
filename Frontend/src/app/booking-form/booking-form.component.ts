import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Booking } from '../interfaces/booking.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Vestido } from '../interfaces/vestido.model';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, HttpClientModule, NgbDatepickerModule],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent implements OnInit {
 
 booking: Booking | undefined;
 vestidos: Vestido | undefined;

 bookingForm = new FormGroup({
  id: new FormControl(),
  name: new FormControl(),
  lastName: new FormControl(),
  email: new FormControl(),
  phone: new FormControl(),
  dateTime: new FormControl(new Date()),
  
  comment: new FormControl()

 });
  

 constructor(
  private httpClient: HttpClient,
  private activatedRoute: ActivatedRoute
 ){}

  ngOnInit(): void {
     this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if(!id) return;

      this.httpClient.get<Vestido>(`http://localhost:3000/vestidos/${id}`)
      .subscribe(vestidos => {
        this.vestidos = vestidos;
       
      });

     });
  }

  save(): void{
     const booking: Booking = {
      id: this.bookingForm.get('id')?.value ?? 0,
      name: this.bookingForm.get('name')?.value ?? '',
      lastName: this.bookingForm.get('lastName')?.value ?? '',
      email: this.bookingForm.get('email')?.value ?? '',
      phone: this.bookingForm.get('phone')?.value ?? 0,
      dateTime: this.bookingForm.get('dateTime')?.value ?? new Date(),
      comment: this.bookingForm.get('comment')?.value ?? '',
     };

     this.httpClient.post<Booking>('http://localhost:3000/booking', booking)
     .subscribe(booking => {
     
      
      this.booking = booking;
     });
  }

}
