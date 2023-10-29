import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { max } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  maxDate: any;
  

  ngOnInit(){
    this.maxDate= new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-5);
  }

  onSubmit(form: NgForm){
    console.log(form);
    
  }

}
