import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { firstValueFrom } from 'rxjs';
import { GeneralResponse } from '../../interfaces/common';
import { ContactForm } from '../../interfaces/contact';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  async insertContact(request: ContactForm){
    return await firstValueFrom(this.http.post<GeneralResponse<Number>>(`${environment.api}plazarella/contact/insert`, request));
  }

}
