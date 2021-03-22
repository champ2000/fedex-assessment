import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { SignUpRoutingModule } from './sign-up.routing.module';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    CoreModule,
    SignUpRoutingModule
  ]
})
export class SignUpModule { }
