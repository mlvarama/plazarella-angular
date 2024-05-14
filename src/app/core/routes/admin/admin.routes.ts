import { Routes } from "@angular/router";


export const ADMIN_ROUTES: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login.routes').then(l => l.LOGIN_ROUTES),
  },
  {
    path: 'categories',
    loadChildren: () => import('./categories.routes').then(c => c.CATEGORIES_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch:"full"
  }

];
