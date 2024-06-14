import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vestido } from '../interfaces/vestido.model';
import { Category } from '../interfaces/category.model';

@Injectable({
  providedIn: 'root'
})
export class VestidosService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getVestido(id: number): Observable<Vestido> {
    return this.http.get<Vestido>(`${this.baseUrl}/vestidos/${id}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/category`);
  }

  createVestido(vestido: FormData): Observable<Vestido> {
    return this.http.post<Vestido>(`${this.baseUrl}/vestidos`, vestido);
  }

  updateVestido(id: number, vestido: FormData): Observable<Vestido> {
    return this.http.put<Vestido>(`${this.baseUrl}/vestidos/${id}`, vestido);
  }
}
