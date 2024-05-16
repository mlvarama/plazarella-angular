import { Routes } from "@angular/router";
import { SidebarComponent } from "../../../components/common/admin/sidebar/sidebar.component";


export const ADMIN_ROUTES: Routes = [
  { path: '', component: SidebarComponent, pathMatch: 'full', title: 'Admin' },
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
