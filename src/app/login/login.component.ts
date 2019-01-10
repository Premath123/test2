import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from '../_models';
import { AlertService, UserService } from '../_services';
//import { AlertService, AuthenticationService } from '../_services';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
   

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
      //  private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            Uid: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
       // this.authenticationService.logout();
       // this.userService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        console.log('in login submit');
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        var user: User = new User();
        user.uid = this.loginForm.controls["Uid"].value;
        
      /*  this.authenticationService.login(this.f.Uid.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });*/

        this.userService.login(user)
            .pipe(first())
            .subscribe(
                data => {
                    
                    this.alertService.success('login successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    
                    this.alertService.error(error);
                    this.loading = false;
                });


    }
}
