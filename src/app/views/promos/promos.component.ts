import { Component } from '@angular/core';
import { BodyModule } from '../../common/body/body.module';

@Component({
  selector: 'app-promos',
  standalone: true,
  imports: [BodyModule],
  templateUrl: './promos.component.html',
  styleUrl: './promos.component.css'
})
export class PromosComponent {

}
