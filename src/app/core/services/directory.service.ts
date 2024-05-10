import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralResponse } from '../../interfaces/common';
import { CategoryButtonFrame, DirectoryFrame, ShopData } from '../../interfaces/directory';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {

  constructor(private http: HttpClient) { }

  getDirectorys(id: number): Observable<GeneralResponse<DirectoryFrame[]>>{
    return this.http.get<GeneralResponse<DirectoryFrame[]>>(`${environment.api}plazarella/shop/directory/${id}`);
  }

  getBussinesActive(): Observable<GeneralResponse<CategoryButtonFrame[]>>{
    return this.http.get<GeneralResponse<CategoryButtonFrame[]>>(`${environment.api}plazarella/businessLine/getActive`);
  }


  getShop(id: number): Observable<GeneralResponse<ShopData>>{
    return this.http.get<GeneralResponse<ShopData>>(`${environment.api}plazarella/shop/show/${id}`);
  }

}
