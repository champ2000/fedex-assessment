import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from 'src/app/core/core.module';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, BrowserAnimationsModule],
      declarations: [ SignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check the validaty of email address', () => {
    component.signupForm.patchValue({ email:  'test.com'});
    let resp = component.signupForm.get('email').valid;
    expect(resp).toBeFalsy();
  });

  it('should check the password does not contain the first name', () => {
    component.signupForm.patchValue({ lastName: 'Bob', firstName: 'bobe', email: 'bob@test.com', password: 'BobPasswodw'});
    let formPassword = component.signupForm.get('password');
    expect(formPassword.hasError('containsFirstOrLastName')).toBe(true);
  });

});
