import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vestido } from '../interfaces/vestido.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http:/localhost:3000/category';

  constructor(private http: HttpClient) { }

  getVestidosByCategory(categoryId: number): Observable<Vestido[]> {
    return this.http.get<Vestido[]>(`${this.apiUrl}/${categoryId}/vestidos`);
  }
}
