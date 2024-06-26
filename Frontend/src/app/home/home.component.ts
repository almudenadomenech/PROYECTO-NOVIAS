import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ImagesService } from '../services/img_portada.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Category } from '../interfaces/category.model';
import { Vestido } from '../interfaces/vestido.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbCarouselModule, RouterLink, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  
})
export class HomeComponent implements OnInit {

  images: string[] | undefined;
  category: Category | undefined;
  vestidos: Vestido[] |undefined;

  constructor(private imageService: ImagesService,
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){

  }
  ngOnInit(): void {
   this.images = this.imageService.getImages();
  
  }

  
   

  
}
