import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { GeneralResponse } from '../../../interfaces/common';
import { environment } from '../../../../environments/environment';
import { PostId, post, status } from '../../../interfaces/admin/post';
import { CategoriesId } from '../../../interfaces/admin/categories';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(headers: HttpHeaders): Observable<GeneralResponse<PostId[]>> {
    const options = { headers: headers };
    return this.http.get<GeneralResponse<PostId[]>>(`${environment.api}plazarella/posts/getAll`, options);
  }

  async insertPost(request: FormData, headers: HttpHeaders){
    const options = { headers: headers };
    return await firstValueFrom(this.http.post<GeneralResponse<PostId>>(`${environment.api}plazarella/contact/insert`, request, options));
  }

  getCategories(headers: HttpHeaders): Observable<GeneralResponse<CategoriesId[]>> {
    const options = { headers: headers };
    return this.http.get<GeneralResponse<CategoriesId[]>>(`${environment.api}plazarella/categories/getActive`, options);
  }

  getStatus(headers: HttpHeaders): Observable<GeneralResponse<status[]>> {
    const options = { headers: headers };
    return this.http.get<GeneralResponse<status[]>>(`${environment.api}plazarella/posts/status`, options);
  }

}
