import { Routes } from "@angular/router";
import { LoginComponent } from "../../../views/admin/login/login.component";


export const LOGIN_ROUTES: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full', title: 'Login' },

];
