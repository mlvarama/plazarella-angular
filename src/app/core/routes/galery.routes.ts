import { Routes } from "@angular/router";
import { GaleryComponent } from "../../views/galery/galery.component";
import { ShowGaleryComponent } from "../../views/show-galery/show-galery.component";

export const GALLERY_ROUTES: Routes = [
    { path: '', component: GaleryComponent, title: 'Galerías' },
    { path: ':id/:name', component: ShowGaleryComponent },
] 