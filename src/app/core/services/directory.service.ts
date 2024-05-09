import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralResponse } from '../../interfaces/GeneralResponse';
import { CategoryButtonFrame, DirectoryFrame } from '../../interfaces/directory';
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

}
