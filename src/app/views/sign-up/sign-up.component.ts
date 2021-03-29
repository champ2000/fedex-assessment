import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { nameInPasswordValidator, passwordMatchValidator, patternValidator, CustomErrorStateMatcher } from 'src/app/core/helpers/validation';
import { SignUpService } from './sign-up.service';
import { SignUpPayload } from './_interfaces_/sign-up.interface';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public signupForm: FormGroup;
  // TODO move to configuration
  public passwordMinLength = 8;
  public emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
  public matcher: CustomErrorStateMatcher;

  spinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Submit',
    spinnerSize: 18,
    raised: true,
    stroked: false,
    buttonColor: 'primary',
    spinnerColor: 'accent',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate'
  }
 
  constructor(private fb: FormBuilder, private signUpService: SignUpService) { }

  ngOnInit() {
    this.createSignupForm();
  }

  createSignupForm(): void {

    this.signupForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, patternValidator(this.emailRegex, { invalidEmail: true })]],
      password: [null, [
        Validators.minLength(this.passwordMinLength),
        Validators.required,
        patternValidator(/[A-Z]/, { hasUpperCase: true }),
        patternValidator(/[a-z]/, { hasLowerCase: true })
      ]],
      confirmPassword: [null, [
        Validators.required
      ]]
    }, { validators:  [nameInPasswordValidator, passwordMatchValidator] });

    this.matcher = new CustomErrorStateMatcher();
  }

  submitAccount():void {

    if (!this.signupForm.valid){
      return null;
    }

    const formv = this.signupForm.value;

    const payload = {
      firstName: formv.firstName,
      lastName: formv.lastName,
      email: formv.email
    } as SignUpPayload; 
    
    this.spinnerButtonOptions.active = true; 

    this.signUpService.sendSignupForm(payload).subscribe(response => {
      this.spinnerButtonOptions.active = false;
      this.spinnerButtonOptions.text = 'Success';
    });
  }

  clearForm():void {
    this.signupForm.clearValidators()
    this.signupForm.reset();
  }

  get password(): AbstractControl {
    return this.signupForm.get('password');
  }

  get email(): AbstractControl {
    return this.signupForm.get('email');
  }

  get confirmPassword(): AbstractControl {
    return this.signupForm.get('confirmPassword');
  }

}
