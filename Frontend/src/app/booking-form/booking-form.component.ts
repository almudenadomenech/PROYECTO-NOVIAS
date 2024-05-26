import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Booking } from '../interfaces/booking.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Vestido } from '../interfaces/vestido.model';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, HttpClientModule],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent implements OnInit {
 
 booking: Booking | undefined;
 
 bookingForm = new FormGroup({
  id: new FormControl(),
  name: new FormControl(),
  lastName: new FormControl(),
  email: new FormControl(),
  phone: new FormControl(),
  date: new FormControl(new Date()),
  time: new FormControl(new TimeRanges()),
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
        
       
      })

     })
  }

}
