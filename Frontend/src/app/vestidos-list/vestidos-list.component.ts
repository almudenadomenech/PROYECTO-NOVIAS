import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Vestido } from '../interfaces/vestido.model';

@Component({
  selector: 'app-vestidos-list',
  standalone: true,
  imports: [HttpClientModule, RouterLink],
  templateUrl: './vestidos-list.component.html',
  styleUrl: './vestidos-list.component.css'
})
export class VestidosListComponent implements OnInit {

  vestidos: Vestido [] = [];

  constructor(private httpClient: HttpClient){}

  ngOnInit(): void {
   this.httpClient.get<Vestido[]>('http://localhost:3000/vestidos')
   .subscribe(vestidos => this.vestidos = vestidos);
  }

}
