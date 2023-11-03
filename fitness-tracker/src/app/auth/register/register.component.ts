import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription, from, max } from 'rxjs';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import * as fromRoot from '../../app.reducer'
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  maxDate: any;
  private loadingSub!: Subscription;
  isLoading$ : Observable<boolean>;
  

  constructor(private authService: AuthService, private uiService: UIService, private store: Store<fromRoot.State>) {

    
  }

  ngOnInit(){
    this.isLoading$=this.store.select(fromRoot.getIsLoading)
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
