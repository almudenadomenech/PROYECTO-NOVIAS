import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../interfaces/category.model';
import { Vestido } from '../interfaces/vestido.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  category: Category | undefined;
  vestidos: Vestido[] = [];

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) {
        return;
      }

      this.httpClient.get<Category>('http://localhost:3000/category/' + id)
        .subscribe(category => this.category = category);

      this.httpClient.get<Vestido[]>('http://localhost:3000/vestidos/filter-by-category-id/' + id)
        .subscribe(vestidos => this.vestidos = vestidos);
    });
  }
}
