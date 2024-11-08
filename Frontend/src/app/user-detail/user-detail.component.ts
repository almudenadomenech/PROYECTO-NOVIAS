import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { User } from '../interfaces/user.model';
import { AuthenticationService } from '../authentication/authentication.service';
import { ImageService } from '../shared/image.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [RouterLink, HttpClientModule, ReactiveFormsModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {

  users: User | undefined;
  baseUrl: string;

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private imageService: ImageService )
    {
    this.baseUrl = this.imageService.getBaseUrl();
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) {
        return;
      }
      this.httpClient.get<User>(`http://localhost:3000/users/filter-by-id/` + id)
        .subscribe(user => {
          this.users = user;
        });
    });
  }

}
