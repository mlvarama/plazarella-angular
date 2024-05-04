import { NgModule } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { NavbarComponent } from '../../components/common/navbar/navbar.component';
import { FooterComponent } from '../../components/common/footer/footer.component';
import { MarginNavbarComponent } from '../../components/common/margin-navbar/margin-navbar.component';
import { GenericBannerComponent } from '../../components/common/generic-banner/generic-banner.component';
import { GenericButtonComponent } from '../../components/common/generic-button/generic-button.component';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    MarginNavbarComponent,
    GenericBannerComponent,
    GenericButtonComponent,
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive, 
    AsyncPipe,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    MarginNavbarComponent,
    GenericBannerComponent,
    GenericButtonComponent,
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive, 
    AsyncPipe, 
  ]
})
export class BodyModule { }
