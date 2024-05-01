import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons'
import { faPhone, faMapLocationDot } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  facebookIcon = faSquareFacebook;
  phoneIcon = faPhone;
  location = faMapLocationDot;
}
