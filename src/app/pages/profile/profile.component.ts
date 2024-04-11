import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  loggedUserId: string = localStorage.getItem("userId") || ""
  loggedUserName: string = localStorage.getItem("userName") || ""
}
