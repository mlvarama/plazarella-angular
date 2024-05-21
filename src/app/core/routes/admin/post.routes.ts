import { Routes } from "@angular/router";
import { PostComponent } from "../../../views/admin/posts/post/post.component";
import { PostAddComponent } from "../../../views/admin/posts/post-add/post-add.component";


export const POST_ROUTES: Routes = [
  { path: '', component: PostComponent, pathMatch: 'full', title: 'Post' },
  { path: 'configure', component: PostAddComponent, pathMatch: 'full', title: 'Post' },

];
