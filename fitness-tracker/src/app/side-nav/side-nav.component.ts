import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  @Output() closeSidenav = new EventEmitter();


  constructor(private authService: AuthService){}

  onCloseSidenav(){
    this.closeSidenav.emit();
  }

  logout(){
    this.onCloseSidenav();
    this.authService.logout();
    
  }

}
