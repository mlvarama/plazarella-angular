import { Component, Input } from '@angular/core';
import { BlogEntrance } from '../../../interfaces/blog';
import { environment } from '../../../../environments/environment.development';
import { GenericButtonComponent } from '../../common/generic-button/generic-button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-entrance',
  standalone: true,
  imports: [GenericButtonComponent, RouterLink],
  templateUrl: './blog-entrance.component.html',
  styleUrl: './blog-entrance.component.css'
})
export class BlogEntranceComponent {
  @Input() data: BlogEntrance;
  ENV: string = environment.api;
}