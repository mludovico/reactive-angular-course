import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {AuthStore} from "./auth.store";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;
  constructor(
    private  fb: FormBuilder,
    private router: Router,
    private authStore: AuthStore
  ) {
    this.form = this.fb.group({
      email: ['test@test.com', [Validators.required]],
      password: ['test', [Validators.required]],
    });
  }

  login() {
    const val = this.form.value;
    if (val.email && val.password) {
      this.authStore.login(val.email, val.password).subscribe(
        () => {
          console.log("User is logged in");
          this.router.navigateByUrl("/courses");
        },
        err => {
          alert("Incorrect username or password")
          console.log("Error logging in: ", err);
        }
      );
    }
  }
}
