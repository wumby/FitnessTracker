import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  @Output() sidenavToggle = new EventEmitter();
  isLoggedIn!: boolean;
  loggedInSubscription!: Subscription;



  constructor(private authService: AuthService){}

  ngOnInit(){
    this.loggedInSubscription = this.authService.authChange.subscribe(data =>{
      this.isLoggedIn = data;
    })
  }

  ngOnDestroy(){
    this.loggedInSubscription.unsubscribe();
  }

  toggleSidenav(){
    this.sidenavToggle.emit();
  }

  logout(){
    this.authService.logout();
  }
}
