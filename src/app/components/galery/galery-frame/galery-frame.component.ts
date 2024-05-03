import { Component, Input } from '@angular/core';
import { GaleryFrame } from '../../../interfaces/galery';
import { GenericButtonComponent } from '../../common/generic-button/generic-button.component';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-galery-frame',
  standalone: true,
  imports: [GenericButtonComponent, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './galery-frame.component.html',
  styleUrl: './galery-frame.component.css'
})
export class GaleryFrameComponent {
  @Input() data: GaleryFrame;

  constructor (private router: Router){}

  goToGalery(name: string, id: number){
    this.router.navigate(['/galerias', name, id]);
  }
}
