import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { GaleryComponent } from './views/galery/galery.component';
import { ShowGaleryComponent } from './views/show-galery/show-galery.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'galerias', component: GaleryComponent},
    {path: 'galerias/:name/:id', component: ShowGaleryComponent},
];
