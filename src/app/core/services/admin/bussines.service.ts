import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralResponse } from '../../../interfaces/common';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Bussines, BussinesId } from '../../../interfaces/admin/bussines';

@Injectable({
  providedIn: 'root'
})
export class BussinesService {

  constructor(private http : HttpClient) { }

  async insert(request: Bussines,headers: HttpHeaders){
    const options = { headers: headers };
     return await firstValueFrom(this.http.post<GeneralResponse<BussinesId>>(`${environment.api}plazarella/businessLine/insert`,request, options));
   }

   getBussines(headers: HttpHeaders): Observable<GeneralResponse<BussinesId[]>> {
    const options = { headers: headers };
    return this.http.get<GeneralResponse<BussinesId[]>>(`${environment.api}plazarella/businessLine/getAll`, options);
  }

  async update(id: Number, request: Bussines, headers: HttpHeaders){
    const options = { headers: headers };
    return await firstValueFrom(this.http.put<GeneralResponse<BussinesId>>(`${environment.api}plazarella/businessLine/update/${id}`, request, options));
  }

  async delete(id: Number, headers: HttpHeaders){
    const options = { headers: headers };
    return await firstValueFrom(this.http.delete<GeneralResponse<BussinesId>>(`${environment.api}plazarella/businessLine/delete/${id}`, options));
  }


}
