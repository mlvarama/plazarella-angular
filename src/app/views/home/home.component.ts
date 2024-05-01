import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/common/navbar/navbar.component';
import { FooterComponent } from '../../components/common/footer/footer.component';
import { MarginNavbarComponent } from '../../components/common/margin-navbar/margin-navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, MarginNavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
}
