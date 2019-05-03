import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'frontend3';

  currentUser: User;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
      //this.authenticationService.logout();
      this.router.navigate(['/login']);
  }

}
