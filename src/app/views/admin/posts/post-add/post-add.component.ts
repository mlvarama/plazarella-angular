import { Component } from '@angular/core';
import { SidebarComponent } from '../../../../components/common/admin/sidebar/sidebar.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { PostId, post, status } from '../../../../interfaces/admin/post';
import { GeneralResponse } from '../../../../interfaces/common';
import { PostService } from '../../../../core/services/admin/post.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CategoriesId } from '../../../../interfaces/admin/categories';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-add',
  standalone: true,
  imports: [SidebarComponent, ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './post-add.component.html',
  styleUrl: './post-add.component.css'
})
export class PostAddComponent {
  frmPost: FormGroup;
  headers: HttpHeaders;
  private iSessionStorageAvailable = typeof sessionStorage !== 'undefined';
  response: GeneralResponse<PostId> = null;
  selectedFile: File | undefined;

  categoriesResults$!: Observable<GeneralResponse<CategoriesId[]>>;
  statusResults$!: Observable<GeneralResponse<status[]>>;


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]; // Almacena el archivo seleccionado
  }

  constructor(private service: PostService, private route : Router) {
    this.frmPost = new FormGroup({
      title: new FormControl(),
      url: new FormControl(),
      image: new FormControl(),
      abstract: new FormControl(),
      body: new FormControl(),
      statusId: new FormControl(),
      categoryId: new FormControl(),
    })

    if (this.iSessionStorageAvailable) {
      this.headers = new HttpHeaders().set('Authorization', sessionStorage.getItem('token') + "");
    }

  }

  async insertPost() {

    const formData = new FormData();
    formData.append('title', this.frmPost.get('title')?.value);
    formData.append('url', this.frmPost.get('url')?.value);
    formData.append('abstract', this.frmPost.get('abstract')?.value);
    formData.append('body', this.frmPost.get('body')?.value);
    formData.append('statusId', this.frmPost.get('statusId')?.value);
    formData.append('categoryId', this.frmPost.get('categoryId')?.value);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }


    this.response = await this.service.insertPost(formData, this.headers);
    if (this.response.success) {
      sessionStorage.setItem('success', 'Se guardo correctamente');
      this.route.navigateByUrl("admin/post");
    } else {
      sessionStorage.setItem('error', this.response.message);
      this.route.navigateByUrl("/admin/post");
    }
  }

  ngOnInit(): void {
    if (this.iSessionStorageAvailable) {
    this.categoriesResults$ = this.service.getCategories(this.headers);
    this.statusResults$ = this.service.getStatus(this.headers);

    }
  }


}
