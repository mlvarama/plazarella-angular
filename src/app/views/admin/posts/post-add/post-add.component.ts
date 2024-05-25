import { Component, Input } from '@angular/core';
import { SidebarComponent } from '../../../../components/common/admin/sidebar/sidebar.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { DataPostEdit, PostId, post, status } from '../../../../interfaces/admin/post';
import { GeneralResponse } from '../../../../interfaces/common';
import { PostService } from '../../../../core/services/admin/post.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CategoriesId } from '../../../../interfaces/admin/categories';
import { Router } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';
import { environment } from '../../../../../environments/environment';


@Component({
  selector: 'app-post-add',
  standalone: true,
  imports: [SidebarComponent, ReactiveFormsModule, HttpClientModule, CommonModule, EditorModule],
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

  @Input() id = '';
  postResult: DataPostEdit = null;
  tinyMCEConfig: any;

  selectedImage: string;
  idImage : Number;



  constructor(private service: PostService, private route: Router) {
    this.frmPost = new FormGroup({
      title: new FormControl('', [Validators.required]),
      url: new FormControl('', [Validators.required]),
      image: new FormControl(),
      abstract: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),
      statusId: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
    })

    if (this.iSessionStorageAvailable) {
      this.headers = new HttpHeaders().set('Authorization', sessionStorage.getItem('token') + "");
    }

  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]; // Almacena el archivo seleccionado
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedImage = e.target.result;
    };
    reader.readAsDataURL(file);
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
      formData.append('image', this.selectedFile);
    }else{
      alert("Selecciona una imagen por favor!");
      return;
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


  async getPost() {
    await this.service.getById(Number(this.id), this.headers).subscribe((res: GeneralResponse<DataPostEdit>) => {
      if (res.success && this.id) {
        this.postResult = res.data;
        this.frmPost.get('title').setValue(this.postResult.post.title);
        this.frmPost.get('url').setValue(this.postResult.post.URL);
        this.frmPost.get('abstract').setValue(this.postResult.post.abstract);
        this.frmPost.get('body').patchValue(this.postResult.post.body);
        this.frmPost.get('statusId').setValue(this.postResult.post.statusId+"");
        this.frmPost.get('categoryId').setValue(this.postResult.post.categoryId+"");
        this.selectedImage = environment.api+ this.postResult.image.image;
        this.idImage = this.postResult.image.id;

      } else {
        sessionStorage.setItem('error', 'No se pudo obtener el post');
        window.location.reload();
      }
    });

  }

  async editPost() {

    const formData = new FormData();
    formData.append('id', this.id);
    formData.append('title', this.frmPost.get('title')?.value);
    formData.append('url', this.frmPost.get('url')?.value);
    formData.append('abstract', this.frmPost.get('abstract')?.value);
    formData.append('body', this.frmPost.get('body')?.value);
    formData.append('statusId', this.frmPost.get('statusId')?.value);
    formData.append('categoryId', this.frmPost.get('categoryId')?.value);
    formData.append('imageId', this.idImage+"");

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.response = await this.service.editPost(formData, this.headers);
    if (this.response.success) {
      sessionStorage.setItem('success', 'Se guardo correctamente');
      this.route.navigateByUrl("admin/post");
    } else {
      sessionStorage.setItem('error', this.response.message);
      this.route.navigateByUrl("/admin/post");
    }
  }







  ngOnInit(): void {

    this.tinyMCEConfig = {
      height: 500,
      plugins: ['anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount'],
      toolbar: 'undo redo | casechange blocks | bold italic backcolor | \ alignleft aligncenter alignright alignjustify | \ bullist numlist checklist outdent indent | removeformat | a11ycheck code table help'
    };

    if (this.iSessionStorageAvailable) {
      this.categoriesResults$ = this.service.getCategories(this.headers);
      this.statusResults$ = this.service.getStatus(this.headers);

      if (this.id) {
        this.getPost();
      }
    }
  }



}
