import { Component } from '@angular/core';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isAuth = false
  logoutIcon = faArrowRightFromBracket

  constructor(public authService: AuthService) { }

  exit() {
    this.authService.logOff()
  }
}
