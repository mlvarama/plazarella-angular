import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { GeneralResponse } from '../../interfaces/common';
import { ActivePromo } from '../../interfaces/promos';

@Injectable({
  providedIn: 'root'
})
export class PromosService {

  constructor(private http: HttpClient) { }

  getActivePromos(): Observable<GeneralResponse<ActivePromo[]>>{
    return this.http.get<GeneralResponse<ActivePromo[]>>(`${environment.api}plazarella/promos/getActive`);
  }

}
