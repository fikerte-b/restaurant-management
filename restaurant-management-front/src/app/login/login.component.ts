import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalVariables } from '../shared-elements/global-variables';
import { StateService } from '../services/state.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup;
  responseMessage: any;

  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private snackbarService = inject(SnackbarService);
  private stateService = inject(StateService);

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<LoginComponent>
  ) {
    this.loginForm = this.formBuilder.nonNullable.group({
      email: ['sofiya@gmail.com', [Validators.required, Validators.email]],
      password: ['Godisgood00', Validators.required],
    });
  }

  ngOnInit(): void {}
  loginOnsubmit() {
    let formData = this.loginForm.value;
    let data = {
      email: formData.email,
      password: formData.password,
    };
    console.log(data);

    this.userService.login(data).subscribe(
      (response: any) => {
        this.dialogRef.close();

        const decoded = jwt_decode(response.data) as any;
        const state = {
          _id: decoded._id,
          email: decoded.email,
          fullname: decoded.fullname,
          role: decoded.role,
          token: response.data,
        };
        this.stateService.state.next(state);
        localStorage.setItem('STATE', JSON.stringify(state));
        this.router.navigate(['/mainPage', 'orders']);
      },
      (error) => {
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalVariables.customError;
        }
        this.snackbarService.openSnackBar(
          this.responseMessage,
          GlobalVariables.error
        );
      }
    );
  }
}
