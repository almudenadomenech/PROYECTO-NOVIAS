import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VestidoFiesta } from '../interfaces/vestido-fiesta.model';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category.model';

@Injectable({
  providedIn: 'root'
})
export class VestidosFiestaService {
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getVestidoFiesta(id: number): Observable<VestidoFiesta> {
    return this.http.get<VestidoFiesta>(`${this.baseUrl}/vestidos-fiesta/${id}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/category`);
  }

  createVestidoFiesta(vestidoFiesta: FormData): Observable<VestidoFiesta> {
    return this.http.post<VestidoFiesta>(`${this.baseUrl}/vestidos-fiesta`, vestidoFiesta);
  }

  updateVestidoFiesta(id: number, vestidoFiesta: FormData): Observable<VestidoFiesta> {
    return this.http.put<VestidoFiesta>(`${this.baseUrl}/vestidos-fiesta/${id}`, vestidoFiesta);
  }
}
