import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [MessageService],
})
export class AuthComponent {
  constructor(
    private messageService: MessageService,
    private _AuthService: AuthService, 
    private _Router: Router) {}
  value!: string;
  ngOnInit(): void {
    let container: any = document.querySelector('#container');
    let registerBtn: any = document.querySelector('#register');
    let loginBtn: any = document.querySelector('#login');

    registerBtn.addEventListener('click', () => {
      container.classList.add('active');
    });

    loginBtn.addEventListener('click', () => {
      container.classList.remove('active');
    });
  }

  // Form to make login
  signInForm: FormGroup = new FormGroup({
    emailAddress: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),
    // phone: new FormControl(1234),
    // phone: new FormControl(null, [
    //   Validators.required,
    //   Validators.pattern(/^[01][0|1|2|5][0-9]{9}$/),
    // ]),
    // ^(?=.[A-Za-z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%*?&]{8,}$
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*[^\w\d])(?=.*\d)(?=.*[A-Z]).{8,}$/
      ),
    ]),
    rememberMe: new FormControl(true),
  });

  // Form to make register
  signUpForm: FormGroup = new FormGroup(
    {
      // Username 'string' is already taken.
      // Name Length Must Be Between 3 to 50 char
      userName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      // phone: new FormControl(null, [
      //   Validators.required,
      //   Validators.pattern(/^[01][0|1|2|5][0-9]{9}$/),
      // ]),
      // Must be email
      emailAddress: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      // Passwords must have at least one non alphanumeric character.
      // Passwords must have at least one digit ('0'-'9').
      // Passwords must have at least one uppercase ('A'-'Z').
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[^\w\d])(?=.*\d)(?=.*[A-Z]).{8,}$/),
      ]),
      // ConfirmPassword' and 'Password' do not match.
      confirmPassword: new FormControl(null, [Validators.required]),
    },
    { validators: this.rePassword }
  );

  signUpError:boolean = false
  signUp(body: any) {
    console.log(body.value);
    this._AuthService.regiter(body.value).subscribe(
      (res) => {
        console.log(res);
        this.signUpError = false
        this.showSuccess()
        let container: any = document.querySelector('#container');
        container.classList.remove('active');     
      },
      (err) => {
        console.log(err.error);
        this.signUpError = true
      }
    );
  }

  signInError:boolean = false
  signIn(body: any) {
    console.log(body.value);
    this._AuthService.login(body.value).subscribe(
      (res) => {
        console.log(res);
        this.signInError = false
        if (res.token != '') {
          console.log(res.token);
          localStorage.setItem('userToken', res.token);
          localStorage.setItem('userId', res.userId);
          this._AuthService.setUserData();
          this._Router.navigate(['/order']);

          //logout automatic 3 seconds after logging in
          // setTimeout(() => { this._AuthService.logout() } , 3000);
        }
      },
      (err) => {
        console.log(err);
        this.signInError = true
      }
    );
  }

  rePassword(signUpForm: any) {
    let passwordControl = signUpForm.get('password');
    let repasswordControl = signUpForm.get('confirmPassword');
    if (passwordControl?.value == repasswordControl?.value) {
      return null;
    } else {
      repasswordControl?.setErrors({
        passwordMatch: 'rePassword must Matched',
      });
      return { passwordMatch: 'rePassword must Matched' };
    }
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Done',
      detail: 'Successfully Registered',
    });
  }
}
