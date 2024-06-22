import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { VestidoFiesta } from '../interfaces/vestido-fiesta.model';
import { AuthenticationService } from '../authentication/authentication.service';
import { ImageService } from '../shared/image.service';

@Component({
  selector: 'app-vestidos-fiesta-detail',
  standalone: true,
  imports: [RouterLink, HttpClientModule, NgbAccordionModule, ReactiveFormsModule],
  templateUrl: './vestidos-fiesta-detail.component.html',
  styleUrl: './vestidos-fiesta-detail.component.css'
})
export class VestidosFiestaDetailComponent implements OnInit {

  vestidosFiesta: VestidoFiesta | undefined;
  isLoogedIn = false;
  baseUrl: string;

  constructor( private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private imageService: ImageService){
      this.authService.isLoggedIn.subscribe(isLoogedIn => this.isLoogedIn = isLoogedIn);
    this.baseUrl = this.imageService.getBaseUrl();
    }
 
 
    ngOnInit(): void {
      this.activatedRoute.params.subscribe(params => {
        const id = params['id'];
        if (!id) {
          return;
        }
        this.httpClient.get<VestidoFiesta>('http://localhost:3000/vestidos-fiesta/' + id)
          .subscribe(vestidosFiesta => {
            this.vestidosFiesta = vestidosFiesta;
          });
      });
    }

}
