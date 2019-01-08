import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from '../_models';

import { AlertService, UserService } from '../_services';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            Uid: ['', Validators.required],
            commonname: ['', Validators.required],
            lastName: ['', Validators.required],
            description: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

   onSubmit() {
       console.log('in register submit');
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
       var user: User=new User();
       user.Uid = this.registerForm.controls["Uid"].value;
       user.commonname = this.registerForm.controls["commonname"].value;
       user.lastName = this.registerForm.controls["lastName"].value; 
       user.description = this.registerForm.controls["description"].value;
       user.email = this.registerForm.controls["email"].value;

       this.userService.register(user)
         .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/register']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
