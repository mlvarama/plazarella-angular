import { Component } from '@angular/core';
import { SidebarComponent } from '../../../components/common/admin/sidebar/sidebar.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Bussines, BussinesId } from '../../../interfaces/admin/bussines';
import { GeneralResponse } from '../../../interfaces/common';
import { Observable } from 'rxjs';
import { BussinesService } from '../../../core/services/admin/bussines.service';

@Component({
  selector: 'app-bussines-line',
  standalone: true,
  imports: [SidebarComponent, ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './bussines-line.component.html',
  styleUrl: './bussines-line.component.css'
})
export class BussinesLineComponent {
  frmBussines: FormGroup;
  headers: HttpHeaders;
  error: string | null = null;
  success: string | null = null;
  bussinesSelected: BussinesId;

  sending: boolean = false;
  sent: boolean = false;
  response: GeneralResponse<BussinesId> = null;
  bussinesResults$!: Observable<GeneralResponse<BussinesId[]>>;
  private iSessionStorageAvailable = typeof sessionStorage !== 'undefined';


  constructor(private service: BussinesService) {
    this.frmBussines = new FormGroup({
      name: new FormControl('', [Validators.required]),
    })

    if (this.iSessionStorageAvailable) {
    this.headers = new HttpHeaders().set('Authorization', sessionStorage.getItem('token') + "");

    if (sessionStorage.getItem('success')) {
      this.success = sessionStorage.getItem('success');
      sessionStorage.removeItem('success');
    } else if (sessionStorage.getItem('error')) {
      this.error = sessionStorage.getItem('error');
      sessionStorage.removeItem('error');
    } else {

    }
  }

  }

  ngOnInit(): void {
    if (this.iSessionStorageAvailable) {
    this.bussinesResults$ = this.service.getBussines(this.headers);
    }
  }


  async insertBussines() {
    const body = this.frmBussines.value as Bussines;
    this.sending = true;
    this.response = await this.service.insert(body, this.headers);
    this.sending = false;
    this.sent = true;

    if (this.response.success) {
      sessionStorage.setItem('success', 'Se guardo correctamente');
      window.location.reload();
    } else {
      sessionStorage.setItem('error', 'No se guardo, intenta nuevamente');
      window.location.reload();
    }
  }

  getBussines(BussinesGet: BussinesId) {
    this.bussinesSelected = BussinesGet;

  }

  async updateBussines() {
    const body = this.frmBussines.value as Bussines;
    this.sending = true;
    this.response = await this.service.update(this.bussinesSelected.id, body, this.headers);
    this.sending = false;
    this.sent = true;

    if (this.response.success) {
      sessionStorage.setItem('success', 'Se guardo correctamente');
      window.location.reload();
    } else {
      sessionStorage.setItem('error', 'No se guardo, intenta nuevamente');
      window.location.reload();
    }
  }


  async deleteBussines(bussines: BussinesId) {
    this.sending = true;
    this.response = await this.service.delete(bussines.id, this.headers);
    this.sending = false;
    this.sent = true;

    if (this.response.success) {
      sessionStorage.setItem('success', 'Se guardo correctamente');
      window.location.reload();
    } else {
      sessionStorage.setItem('error', 'No se guardo, intenta nuevamente');
      window.location.reload();
    }


  }
}
