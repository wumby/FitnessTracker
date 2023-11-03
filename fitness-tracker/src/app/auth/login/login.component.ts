import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer'
import { Observable,map } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
 isLoading$!: Observable<boolean>;
  private loadingSub!: Subscription;

  constructor(private authService: AuthService, private uiService: UIService, private store: Store<fromRoot.State>) {

    
  }

  ngOnInit() {
    this.isLoading$ =this.store.select(fromRoot.getIsLoading)
  }


  onSubmit(form: NgForm){
    this.authService.login({
      email: form.value.email,
      password:form.value.password
    });
    
  }
}
