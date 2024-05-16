import { Component } from '@angular/core';
import { SidebarComponent } from '../../../components/common/admin/sidebar/sidebar.component';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GeneralResponse } from '../../../interfaces/common';
import { Categories, CategoriesId } from '../../../interfaces/admin/categories';
import { CategoriesService } from '../../../core/services/admin/categories.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [SidebarComponent, ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  frmCategory: FormGroup;
  headers: HttpHeaders;
  error: string | null = null;
  success: string | null = null;
  categorySelected: CategoriesId;

  sending: boolean = false;
  sent: boolean = false;
  response: GeneralResponse<CategoriesId> = null;
  categoriesResults$!: Observable<GeneralResponse<CategoriesId[]>>;
  private iSessionStorageAvailable = typeof sessionStorage !== 'undefined';


  constructor(private service: CategoriesService) {
    this.frmCategory = new FormGroup({
      name: new FormControl(),
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
    this.categoriesResults$ = this.service.getCategories(this.headers);
    }
  }


  async insertCategories() {
    const body = this.frmCategory.value as Categories;
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

  getCategory(categoryGet: CategoriesId) {
    this.categorySelected = categoryGet;

  }

  async updateCategories() {
    const body = this.frmCategory.value as Categories;
    this.sending = true;
    this.response = await this.service.update(this.categorySelected.id, body, this.headers);
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


  async deleteCategory(category: CategoriesId) {
    this.sending = true;
    this.response = await this.service.delete(category.id, this.headers);
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
