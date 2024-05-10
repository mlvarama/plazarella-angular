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

  async displayMobileMenu(){
    this.menuMobileHiddden = !this.menuMobileHiddden;
    const menuMobile = document.getElementById('menuMobile');
    if (this.menuMobileHiddden){
      menuMobile.classList.remove('flex');
      menuMobile.classList.remove('animate__fadeInDown');

      menuMobile.classList.add('animate__fadeOutUp');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      menuMobile.classList.add('hidden');
    }else {
      menuMobile.classList.remove('hidden');
      menuMobile.classList.remove('animate__fadeOutUp');

      menuMobile.classList.add('flex');
      menuMobile.classList.add('animate__fadeInDown');
    }
  }
}
