
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../../core/services/admin/login.service';
import { GeneralResponse } from '../../../interfaces/common';
import { RequestLogin, ResponseLogin} from '../../../interfaces/admin/login';
import { BodyModule } from '../../../common/body/body.module';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, BodyModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  sending: boolean = false;
  sent: boolean = false;
  response: GeneralResponse<ResponseLogin> = null;

  formLogin = new FormGroup({
    user: new FormControl(),
    password: new FormControl(),
  })

  constructor(private service: LoginService, private route : Router) {

  }



  async submitData(){
    const body = this.formLogin.value as RequestLogin;
    this.sending = true;
    this.response = await this.service.login(body);
    this.sending = false;
    this.sent = true;

    if (this.response.success) {
      sessionStorage.setItem('token', this.response.data.token);
      this.route.navigateByUrl("admin/categories");
    }
  }

}
