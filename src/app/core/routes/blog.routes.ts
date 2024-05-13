import { Routes } from "@angular/router";
import { BlogComponent } from "../../views/blog/blog.component";
import { BlogDetailComponent } from "../../views/blog-detail/blog-detail.component";

export const BLOG_ROUTES: Routes = [
    {
        path: '',
        component: BlogComponent,
        title: 'Blog'
    },
    {
        path: ':id/:name',
        component: BlogDetailComponent
    }
]