import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/common/navbar/navbar.component';
import { MarginNavbarComponent } from '../../components/common/margin-navbar/margin-navbar.component';
import { GenericBannerComponent } from '../../components/common/generic-banner/generic-banner.component';
import { FooterComponent } from '../../components/common/footer/footer.component';

@Component({
  selector: 'app-directory-detail',
  standalone: true,
  imports: [NavbarComponent, MarginNavbarComponent, GenericBannerComponent, FooterComponent],
  templateUrl: './directory-detail.component.html',
  styleUrl: './directory-detail.component.css'
})
export class DirectoryDetailComponent {

}
