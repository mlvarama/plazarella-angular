import { Routes } from "@angular/router";
import { PostComponent } from "../../../views/admin/post/post.component";


export const POST_ROUTES: Routes = [
  { path: '', component: PostComponent, pathMatch: 'full', title: 'Post' },

];
