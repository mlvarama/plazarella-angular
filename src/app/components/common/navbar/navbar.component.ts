import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faBookOpenReader, faHandHoldingDollar, faCameraRetro, faBlog, faContactBook } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  menuMobileHiddden = true;

  home = faHome;
  book = faBookOpenReader;
  promos = faHandHoldingDollar;
  galery = faCameraRetro;
  blog = faBlog;
  contact = faContactBook;
}
