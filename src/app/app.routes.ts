import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { GaleryComponent } from './views/galery/galery.component';
import { ShowGaleryComponent } from './views/show-galery/show-galery.component';

export const routes: Routes = [
    {
        path: '', 
        loadComponent: () => import('./views/home/home.component').then(h => h.HomeComponent), 
        title: 'Plazarella',
    },
    {
        path: 'galerias', 
        loadChildren: ()=> import('./core/routes/galery.routes').then(r => r.GALLERY_ROUTES)
    },
    {
        path: 'promociones',
        loadComponent: () => import('./views/promos/promos.component').then(c => c.PromosComponent),
        title: 'Promociones'
    }, 
    {
        path: '**',
        redirectTo: '/'
    }
];
