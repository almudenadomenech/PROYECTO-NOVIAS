import { Component, OnInit } from '@angular/core';
import { Booking } from '../interfaces/booking.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ImageService } from '../shared/image.service';

@Component({
  selector: 'app-booking-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.css'
})
export class BookingDetailComponent implements OnInit{

  booking: Booking | undefined;
  baseUrl: string;

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private imageService: ImageService)
    {
    this.baseUrl = this.imageService.getBaseUrl();
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.httpClient.get<Booking>(`http://localhost:3000/booking/filter-by-id/${id}`)
.subscribe(booking => this.booking = booking);
    })
  }

}
