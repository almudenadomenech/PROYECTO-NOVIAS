import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Booking } from '../interfaces/booking.model';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.service';
import { ImageService } from '../shared/image.service';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [RouterLink, NgbAlert],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css'
})
export class BookingListComponent implements OnInit{

  userEmail = '';
  isAdmin = false;
  bookings: Booking[] = [];
  showConfirmMessage = false;
  baseUrl: string;

  private modalService = inject(NgbModal);
  
  constructor(private httpClient: HttpClient,
    private authService: AuthenticationService,
    private imageService: ImageService){

    this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
    this.baseUrl = this.imageService.getBaseUrl();
  }
    closeConfirmation(): void {
   
      this.showConfirmMessage = false; 
    } 
    openModal(content: TemplateRef<any>, bookings: Booking) {
      const modalRef = this.modalService.open(content, {
        centered: true
      });
  
      modalRef.result.then(result => {
        if (result === 'Aceptar') {
          console.log('Ha pulsado boorrar reserva');
          this.deleteById(bookings);
  
        }
      });
  
    } 
  ngOnInit(): void {
    this.loadBookings();
    
  }
  loadBookings(): void {
    this.httpClient.get<Booking[]>('http://localhost:3000/booking/filter-by-current-user')
    .subscribe(bookings => this.bookings = bookings);
    
    /* this.httpClient.get<Booking[]>('http://localhost:3000/booking/filter-by-photoUrl')
    .subscribe(bookings => this.bookings = bookings); */
  }
  getPhotoUrl(booking: Booking): string {
    return booking.vestidos?.photoUrl || booking.vestidoFiesta?.photoUrl || '';
  }
  

  deleteById(booking: Booking) {
    
    this.httpClient.delete<Booking>('http://localhost:3000/booking/' + booking.id)
      .subscribe(() => {
        this.showConfirmMessage = true;
       
        this.loadBookings();
      });
  }

}  
 


