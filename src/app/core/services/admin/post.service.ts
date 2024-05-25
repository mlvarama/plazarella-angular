import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { GeneralResponse } from '../../../interfaces/common';
import { environment } from '../../../../environments/environment';
import { DataPostEdit, PostId, post, status } from '../../../interfaces/admin/post';
import { CategoriesId } from '../../../interfaces/admin/categories';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postEdit :PostId ;

  constructor(private http: HttpClient) { }

  getPosts(headers: HttpHeaders): Observable<GeneralResponse<PostId[]>> {
    const options = { headers: headers };
    return this.http.get<GeneralResponse<PostId[]>>(`${environment.api}plazarella/posts/getAll`, options);
  }

  async insertPost(request: FormData, headers: HttpHeaders){
    const options = { headers: headers };
    return await firstValueFrom(this.http.post<GeneralResponse<PostId>>(`${environment.api}plazarella/posts/insert`, request, options));
  }

  async editPost(request: FormData, headers: HttpHeaders){
    const options = { headers: headers };
    return await firstValueFrom(this.http.put<GeneralResponse<PostId>>(`${environment.api}plazarella/posts/update`, request, options));
  }


  getCategories(headers: HttpHeaders): Observable<GeneralResponse<CategoriesId[]>> {
    const options = { headers: headers };
    return this.http.get<GeneralResponse<CategoriesId[]>>(`${environment.api}plazarella/categories/getActive`, options);
  }

  getStatus(headers: HttpHeaders): Observable<GeneralResponse<status[]>> {
    const options = { headers: headers };
    return this.http.get<GeneralResponse<status[]>>(`${environment.api}plazarella/posts/status`, options);
  }

  getById(id: Number ,headers: HttpHeaders): Observable<GeneralResponse<DataPostEdit>> {
    const options = { headers: headers };
    return this.http.get<GeneralResponse<DataPostEdit>>(`${environment.api}plazarella/posts/getById/${id}`, options);
  }

  async featured(id: Number, headers: HttpHeaders){
    const options = { headers: headers };
    return await firstValueFrom(this.http.put<GeneralResponse<PostId>>(`${environment.api}plazarella/posts/addFeatured/${id}`, null,options));
  }

  async delete(id: Number, headers: HttpHeaders){
    const options = { headers: headers };
    return await firstValueFrom(this.http.delete<GeneralResponse<PostId>>(`${environment.api}plazarella/posts/delete/${id}`, options));
  }
}
