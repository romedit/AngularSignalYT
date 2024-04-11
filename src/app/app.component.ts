import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { DbService } from './services/db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular App With Signal Feature';
  constructor(public authService: AuthService, public dbService: DbService) {
    this.dbService.findAllCategories()
  }
}
