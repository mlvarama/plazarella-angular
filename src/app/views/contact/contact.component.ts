import { Component } from '@angular/core';
import { BodyModule } from '../../common/body/body.module';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPhone, faMapLocationDot, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { ContactService } from '../../core/services/contact.service';
import { ContactForm } from '../../interfaces/contact';
import { GeneralResponse } from '../../interfaces/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [BodyModule, FormsModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  phoneIcon = faPhone;
  mapIcon = faMapLocationDot;
  loader = faSpinner;
  sending: boolean = false;
  sent: boolean = false;
  response: GeneralResponse<any> = null;

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
  });

  constructor(private service: ContactService){}

  async submitData(){
    const body = this.contactForm.value as ContactForm;
    this.sending = true;
    this.response = await this.service.insertContact(body);
    this.sending = false;
    this.sent = true;
  }

  
  
}
