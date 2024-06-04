import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private readonly baseUrl: string = 'http://localhost:3000/uploads/';

  constructor() { }

  getBaseUrl(): string {
    return this.baseUrl;
  }
}
