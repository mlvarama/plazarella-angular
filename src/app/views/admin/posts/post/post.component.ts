import { Component } from '@angular/core';
import { SidebarComponent } from '../../../../components/common/admin/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { GeneralResponse } from '../../../../interfaces/common';
import { PostId } from '../../../../interfaces/admin/post';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { PostService } from '../../../../core/services/admin/post.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-post',
  standalone: true,

  imports: [SidebarComponent,CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})

export class PostComponent {
  response: GeneralResponse<PostId> = null;
  postsResults$!: Observable<GeneralResponse<PostId[]>>;
  private iSessionStorageAvailable = typeof sessionStorage !== 'undefined';

  headers: HttpHeaders;
  error: string | null = null;
  success: string | null = null;

  fstar = faStar;


  constructor(private service: PostService, private route : Router){
    if (this.iSessionStorageAvailable) {
    this.headers = new HttpHeaders().set('Authorization', sessionStorage.getItem('token') + "");

    if (sessionStorage.getItem('success')) {
      this.success = sessionStorage.getItem('success');
      sessionStorage.removeItem('success');
    } else if (sessionStorage.getItem('error')) {
      this.error = sessionStorage.getItem('error');
      sessionStorage.removeItem('error');
    } else {

    }
  }

  }


  async featured(id: Number) {

    this.response = await this.service.featured(id, this.headers);


    if (this.response.success) {
      sessionStorage.setItem('success', 'Se guardo correctamente');
      window.location.reload();
    } else {
      sessionStorage.setItem('error', 'No se guardo, intenta nuevamente');
      window.location.reload();
    }


  }

  async deletePost(id : Number) {

    this.response = await this.service.delete(id, this.headers);

    if (this.response.success) {
      sessionStorage.setItem('success', 'Se guardo correctamente');
      window.location.reload();
    } else {
      sessionStorage.setItem('error', 'No se guardo, intenta nuevamente');
      window.location.reload();
    }


  }



  ngOnInit(): void {
    if (this.iSessionStorageAvailable) {
    this.postsResults$ = this.service.getPosts(this.headers);
    }
  }


    getPost(id : Number){
      this.route.navigate(['admin/post/configure'], { queryParams: { id: id}});
    }

}
