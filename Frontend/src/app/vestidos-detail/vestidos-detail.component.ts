
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Vestido } from '../interfaces/vestido.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../authentication/authentication.service';
import { ImageService } from '../shared/image.service';

@Component({
  selector: 'app-vestidos-detail',
  standalone: true,
  imports: [RouterLink, HttpClientModule, NgbAccordionModule, ReactiveFormsModule],
  templateUrl: './vestidos-detail.component.html',
  styleUrls: ['./vestidos-detail.component.css']
})
export class VestidosDetailComponent implements OnInit {

  vestidos: Vestido | undefined;
  isLoogedIn = false;
  baseUrl: string;

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private imageService: ImageService
  ) {
    this.authService.isLoggedIn.subscribe(isLoogedIn => this.isLoogedIn = isLoogedIn);
    this.baseUrl = this.imageService.getBaseUrl();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) {
        return;
      }
      this.httpClient.get<Vestido>('http://localhost:3000/vestidos/' + id)
        .subscribe(vestido => {
          this.vestidos = vestido;
        });
    });
  }
}

