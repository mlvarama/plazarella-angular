import { Component, Input } from '@angular/core';
import { GaleryFrame } from '../../../interfaces/galery';
import { GenericButtonComponent } from '../../common/generic-button/generic-button.component';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-galery-frame',
  standalone: true,
  imports: [GenericButtonComponent, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './galery-frame.component.html',
  styleUrl: './galery-frame.component.css'
})
export class GaleryFrameComponent {

  ENV: string = environment.api;
  @Input() data: GaleryFrame;
  @Input() hasButton: boolean = true;
  constructor (private router: Router){}

}
