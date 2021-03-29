import { ValidationErrors, ValidatorFn, AbstractControl, FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export function patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.value) {
      return null;
    }
    const valid = regex.test(control.value);
    return valid ? null : error;
  };
}

export function passwordMatchValidator(control: FormGroup): ValidationErrors | null {
  if (!control.value) {
    return null;
  }
  const password: string = control.get('password').value;
  const confirmPassword: string = control.get('confirmPassword').value; 
  if (password !== confirmPassword) {
    control.get('confirmPassword').setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  }
}


export function nameInPasswordValidator(control: FormGroup): ValidationErrors | null {
  const fName = control.get('firstName').value;
  const lName = control.get('lastName').value;
  const password = control.get('password');

  if (!password || !password.value || !fName || !lName) {
    return null;
  }

  let fNameInPassword = false;
  let lNameInPassword = false;

  if (password) {
    if (fName) {
      fNameInPassword = password.value.toLowerCase().includes(fName.toLowerCase());
    }
    if (lName) {
      lNameInPassword = password.value.toLowerCase().includes(lName.toLowerCase());
    }
  }

  if (fNameInPassword || lNameInPassword) {
    password.setErrors({ containsFirstOrLastName: true });
    return { containsFirstOrLastName: true};
  }
  return null;
}
