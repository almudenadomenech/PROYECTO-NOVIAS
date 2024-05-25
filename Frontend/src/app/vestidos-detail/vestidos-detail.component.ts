import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Vestido } from '../interfaces/vestido.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-vestidos-detail',
  standalone: true,
  imports: [RouterLink, HttpClientModule, NgbAccordionModule ],
  templateUrl: './vestidos-detail.component.html',
  styleUrl: './vestidos-detail.component.css'
})
export class VestidosDetailComponent implements OnInit{

  vestidos: Vestido | undefined;

constructor(private httpClient: HttpClient, private activatedRouted: ActivatedRoute){}
 

ngOnInit(): void {
   this.activatedRouted.params.subscribe(params => {
    const id = params['id'];
    if(!id){
      return;
    }
    this.httpClient.get<Vestido>('http://localhost:3000/vestidos/' + id)
    .subscribe(vestido => {
      this.vestidos = vestido
    });
   })
  }

}
