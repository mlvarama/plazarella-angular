import { Routes } from '@angular/router';


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
      path: 'directorio',
      loadChildren: () => import('./core/routes/directory.routes').then(r => r.DIRECTORY_ROUTES)
    },
    {
        path: 'promociones',
        loadComponent: () => import('./views/promos/promos.component').then(c => c.PromosComponent),
        title: 'Promociones'
    }, 
    {
        path: 'contacto',
        loadComponent: () => import('./views/contact/contact.component').then(c => c.ContactComponent),
        title: 'Contacto'
    }, 
    {
        path: 'blog',
        loadChildren: () => import('./core/routes/blog.routes').then(b => b.BLOG_ROUTES),
    }, 
    {
        path: '**',
        redirectTo: '/'
    }
];
