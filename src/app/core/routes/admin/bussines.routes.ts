import { Routes } from "@angular/router";
import { BussinesLineComponent } from "../../../views/admin/bussines-line/bussines-line.component";


export const BUSSINES_ROUTES: Routes = [
  { path: '', component: BussinesLineComponent, pathMatch: 'full', title: 'Giro Comercial' },

];
