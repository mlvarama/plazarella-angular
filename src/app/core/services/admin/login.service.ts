import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralResponse } from '../../../interfaces/common';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ResponseLogin, RequestLogin } from '../../../interfaces/admin/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }

 async login(request: RequestLogin){
    return await firstValueFrom(this.http.post<GeneralResponse<ResponseLogin>>(`${environment.api}plazarella/login/authenticate`, request));
  }

}
