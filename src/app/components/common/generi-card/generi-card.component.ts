import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-generi-card',
  standalone: true,
  imports: [],
  templateUrl: './generi-card.component.html',
  styleUrl: './generi-card.component.css'
})
export class GeneriCardComponent {
  @Input() nameImageCard: string;
  @Input() routeImageCard: string;

}
