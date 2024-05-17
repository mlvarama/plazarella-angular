import { Component } from '@angular/core';
import { SidebarComponent } from '../../../components/common/admin/sidebar/sidebar.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})

export class PostComponent {

}
