import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GaleryFrame, GaleryDetail } from '../../interfaces/galery';
import { environment } from '../../../environments/environment';
import { GeneralResponse } from '../../interfaces/common';

@Injectable({
  providedIn: 'root'
})
export class GaleryService {

  constructor(private http: HttpClient) { }

  getGaleryList(): Observable<GeneralResponse<GaleryFrame[]>>{
    return this.http.get<GeneralResponse<GaleryFrame[]>>(`${environment.api}plazarella/galery/getActive`);
  }

  getGaleryDetailById(id: number): Observable<GeneralResponse<GaleryDetail>> {
    return this.http.get<GeneralResponse<GaleryDetail>>(`${environment.api}plazarella/galery/showGaleryById/${id}`)
  }
}
