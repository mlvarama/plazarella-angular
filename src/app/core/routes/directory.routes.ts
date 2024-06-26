import { Routes } from "@angular/router";
import { DirectoryComponent } from "../../views/directory/directory.component";
import { DirectoryDetailComponent } from "../../views/directory-detail/directory-detail.component";


export const DIRECTORY_ROUTES: Routes = [
  { path: '', component: DirectoryComponent, pathMatch: 'full', title: 'Directorio' },
  { path: 'shop', component: DirectoryDetailComponent, pathMatch: 'full' },
  { path: ':id', component: DirectoryComponent },
];
