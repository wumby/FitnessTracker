import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { max } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  maxDate: any;
  

  constructor(private authService: AuthService) {

    
  }

  ngOnInit(){
    this.maxDate= new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-5);
  }

  onSubmit(form: NgForm){
    const authData = {
      email: form.value.email,
      password: form.value.password
    }
    this.authService.registerUser(authData);
    
  }

}
