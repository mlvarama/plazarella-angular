import { Routes } from "@angular/router";
import { CategoriesComponent } from "../../../views/admin/categories/categories.component";


export const CATEGORIES_ROUTES: Routes = [
  { path: '', component: CategoriesComponent, pathMatch: 'full', title: 'Categorias' },

];
