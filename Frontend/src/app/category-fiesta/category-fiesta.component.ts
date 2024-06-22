import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryFiesta } from '../interfaces/categoryFiesta.model';
import { VestidoFiesta } from '../interfaces/vestido-fiesta.model';

@Component({
  selector: 'app-category-fiesta',
  standalone: true,
  imports: [],
  templateUrl: './category-fiesta.component.html',
  styleUrl: './category-fiesta.component.css'
})
export class CategoryFiestaComponent implements OnInit{

  categoryFiesta: CategoryFiesta | undefined;
  vestidosFiesta: VestidoFiesta[] = [];

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) {
        return;
      }

      this.httpClient.get<CategoryFiesta>('http://localhost:3000/category-fiesta/' + id)
        .subscribe(categoryFiesta => this.categoryFiesta = categoryFiesta);

      this.httpClient.get<VestidoFiesta[]>('http://localhost:3000/vestidos-fiesta/filter-by-categoryFiesta-id/' + id)
        .subscribe(vestidosFiesta => this.vestidosFiesta = vestidosFiesta);
    });
  }

}
