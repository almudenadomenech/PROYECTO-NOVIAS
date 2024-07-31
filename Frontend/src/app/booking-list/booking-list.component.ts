import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Booking } from '../interfaces/booking.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.service';

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
  private modalService = inject(NgbModal);
  
  constructor(private httpClient: HttpClient,
    private authService: AuthenticationService){

    this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
    }
    closeConfirmation(): void {
   
      this.showConfirmMessage = false; // Suponiendo que showConfirmMessage controla la visibilidad de un mensaje de confirmación
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
  }

  deleteById(booking: Booking) {
    
    this.httpClient.delete<Booking>('http://localhost:3000/booking/' + booking.id)
      .subscribe(() => {
        this.showConfirmMessage = true;
        // this.bookings = this.bookings.filter(booking => booking.id !== booking.id);
        this.loadBookings();
      });
  }

}  
 


