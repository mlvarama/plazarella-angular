import { Component, Input, OnInit } from '@angular/core';
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
export class GaleryFrameComponent implements OnInit{

  ENV: string = environment.api;
  @Input() data: GaleryFrame;
  @Input() hasButton: boolean = true;
  constructor (private router: Router){}

  item : any;

  ngOnInit(): void {
    if (this.data.name){
      this.item = {
        ...this.data,
        route: this.data.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replaceAll(' ', '-').toLowerCase()
      }
    }
  }
 
}
