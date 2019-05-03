import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
	
	startDate = new FormControl('');
	endDate = new FormControl('');

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    logout(){
        this.authenticationService.logout();
        this.router.navigate(['/login']);
      }
}