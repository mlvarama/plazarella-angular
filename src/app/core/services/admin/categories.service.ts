import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categories, CategoriesId } from '../../../interfaces/admin/categories';
import { GeneralResponse } from '../../../interfaces/common';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http : HttpClient) { }

  async insert(request: Categories,headers: HttpHeaders){
    const options = { headers: headers };
     return await firstValueFrom(this.http.post<GeneralResponse<CategoriesId>>(`${environment.api}plazarella/categories/insert`,request, options));
   }

   getCategories(headers: HttpHeaders): Observable<GeneralResponse<CategoriesId[]>> {
    const options = { headers: headers };
    return this.http.get<GeneralResponse<CategoriesId[]>>(`${environment.api}plazarella/categories/getAll`, options);
  }

  async update(id: Number, request: Categories, headers: HttpHeaders){
    const options = { headers: headers };
    return await firstValueFrom(this.http.put<GeneralResponse<CategoriesId>>(`${environment.api}plazarella/categories/update/${id}`, request, options));
  }

  async delete(id: Number, headers: HttpHeaders){
    const options = { headers: headers };
    return await firstValueFrom(this.http.delete<GeneralResponse<CategoriesId>>(`${environment.api}plazarella/categories/delete/${id}`, options));
  }


}
