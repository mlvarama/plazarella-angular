import { Component } from '@angular/core';
import { SidebarComponent } from '../../../../components/common/admin/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GeneralResponse } from '../../../../interfaces/common';
import { PostId } from '../../../../interfaces/admin/post';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { PostService } from '../../../../core/services/admin/post.service';

@Component({
  selector: 'app-post',
  standalone: true,

  imports: [SidebarComponent,CommonModule, RouterModule],
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



  constructor(private service: PostService){
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

  ngOnInit(): void {
    if (this.iSessionStorageAvailable) {
    this.postsResults$ = this.service.getPosts(this.headers);
    }
  }






}
