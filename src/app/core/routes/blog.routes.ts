import { Routes } from "@angular/router";
import path from "path";
import { BlogComponent } from "../../views/blog/blog.component";

export const BLOG_ROUTES: Routes = [
    {
        path: '',
        component: BlogComponent,
        title: 'Blog'
    },
    {
        path: ':id',
        component: BlogComponent
    }
]