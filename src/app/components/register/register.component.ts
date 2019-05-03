import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';


@Component({ 
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.compose([
                Validators.required,
                Validators.email,
            ])],
            password: ['', Validators.required]
        });

        // reset register status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        console.log("submit", this.f.firstname.value, this.f.lastname.value, this.f.email.value, this.f.password.value);
        this.authenticationService.register(this.f.firstname.value, this.f.lastname.value, this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    console.log("returnUrl", this.returnUrl);
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
}