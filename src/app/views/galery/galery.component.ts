import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/common/navbar/navbar.component';
import { FooterComponent } from '../../components/common/footer/footer.component';
import { MarginNavbarComponent } from '../../components/common/margin-navbar/margin-navbar.component';
import { GenericBannerComponent } from '../../components/common/generic-banner/generic-banner.component';
import { AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GaleryService } from '../../core/services/galery.service';
import { Observable, map } from 'rxjs';
import { GaleryFrame } from '../../interfaces/galery';
import { GeneralResponse } from '../../interfaces/GeneralResponse';
import { GaleryFrameComponent } from '../../components/galery/galery-frame/galery-frame.component';
import { environment } from '../../../environment/enviroment';

@Component({
  selector: 'app-galery',
  standalone: true,
  imports: [AsyncPipe, NavbarComponent, GaleryFrameComponent, FooterComponent, MarginNavbarComponent, RouterOutlet, GenericBannerComponent],
  templateUrl: './galery.component.html',
  styleUrl: './galery.component.css'
})
export class GaleryComponent implements OnInit{

  galeryResults$!: Observable<GeneralResponse<GaleryFrame[]>>;

  constructor (private service: GaleryService){}

  ngOnInit(): void {
    this.galeryResults$ = this.service.getGaleryList().pipe(
      map(element => {
        element.data.forEach(item => {
          if (!item.photo.startsWith(environment.api)){
            item.photo = environment.api + item.photo;
          }
        })
        return element;
      })
    );
  }

}
