import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { SignUpPayload } from './_interfaces_/sign-up.interface';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient) { }

  public sendSignupForm(payload: SignUpPayload): Observable<any> {
    return this.http.post<SignUpPayload>(environment.SIGNUP_URL, payload);
  }

}
