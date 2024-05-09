import { Component, Input } from '@angular/core';
import { FeaturedBlog } from '../../../interfaces/blog';
import { environment } from '../../../../environments/environment.development';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { GenericButtonComponent } from '../../common/generic-button/generic-button.component';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [FontAwesomeModule, GenericButtonComponent],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.css'
})
export class BlogCardComponent {
  @Input() icon = faStar;
  ENV: string = environment.api
  @Input() title: string = '';
  @Input() data: FeaturedBlog[];
}
