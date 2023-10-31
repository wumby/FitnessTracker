import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
 

  constructor(private authService: AuthService) {

    
  }

  ngOnInit() {

  }

  onSubmit(form: NgForm){
    this.authService.login({
      email: form.value.email,
      password:form.value.password
    });
    
  }
}
