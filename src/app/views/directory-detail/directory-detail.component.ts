import { Component, Input, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/common/navbar/navbar.component';
import { MarginNavbarComponent } from '../../components/common/margin-navbar/margin-navbar.component';
import { GenericBannerComponent } from '../../components/common/generic-banner/generic-banner.component';
import { FooterComponent } from '../../components/common/footer/footer.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBookmark, faPhoneVolume, faEnvelope, faGlobe,faClock, faLocationDot} from '@fortawesome/free-solid-svg-icons'
import { Observable } from 'rxjs';
import { GeneralResponse } from '../../interfaces/common';
import { ShopData } from '../../interfaces/directory';
import { DirectoryService } from '../../core/services/directory.service';
import { BodyModule } from '../../common/body/body.module';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-directory-detail',
  standalone: true,
  imports: [BodyModule,SlickCarouselModule, FontAwesomeModule],
  templateUrl: './directory-detail.component.html',
  styleUrl: './directory-detail.component.css'
})
export class DirectoryDetailComponent implements OnInit {
  shopResults$!: Observable<GeneralResponse<ShopData>>;
  @Input() id = '';
  env = environment.api;
  nameImage ="";
  //iconos
  fmark = faBookmark;
  fphone = faPhoneVolume;
  fenvelope = faEnvelope;
  fGlobe = faGlobe;
  fclock = faClock;
  floc = faLocationDot;

  constructor(private service: DirectoryService) {

  }

ngOnInit(): void {
  this.shopResults$ = this.service.getShop(Number(this.id));

}


sliderForConfig = {
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '#slider-nav'
};

slideConfig = {
  autoplay: true,
  autoplaySpeed: 1500,
  speed: 500,
  cssEase: 'linear',
  infinite: true,
  dots: true,
  arrows: true,
  slidesToShow: 1,
  variableWidth: true,
  draggable: true,
  pauseOnHover: false,
  pauseOnDotsHover: false,
  asNavFor: '#slider-for', // Usamos el ID del otro carrusel
  focusOnSelect: true,
  centerMode: true,
};



image(src : string){
 this.nameImage = src;

}



  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e) {
    if(e.currentSlide){

    }

  }

  beforeChange(e) {
    console.log('beforeChange');
  }

}
