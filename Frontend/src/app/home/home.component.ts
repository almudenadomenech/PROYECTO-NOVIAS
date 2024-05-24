import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ImagesService } from '../services/img_portada.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbCarouselModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  
})
export class HomeComponent implements OnInit {

  images: string[] | undefined;

  constructor(private imageService: ImagesService){

  }
  ngOnInit(): void {
   this.images = this.imageService.getImages();
  }

}

