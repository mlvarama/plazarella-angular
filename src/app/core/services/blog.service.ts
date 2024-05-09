import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlogPagination, GeneralResponse, PaginationRows } from '../../interfaces/common';
import { BlogEntrance, FeaturedBlog } from '../../interfaces/blog';
import { environment } from '../../../environments/environment.development';
import { Observable, firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  getBlogPagination(request: BlogPagination): Observable<GeneralResponse<PaginationRows<BlogEntrance[]>>> {
    return this.http.post<GeneralResponse<PaginationRows<BlogEntrance[]>>>(`${environment.api}plazarella/posts/pagination`, request);
  }

  getFeaturedBlog(): Observable<GeneralResponse<FeaturedBlog[]>> {
    return this.http.get<GeneralResponse<FeaturedBlog[]>>(`${environment.api}plazarella/posts/featured`);
  }

}
