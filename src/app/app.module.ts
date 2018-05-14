import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { TrialSignUpComponent } from './components/trial-sign-up/trial-sign-up.component';
import { IndexComponent } from './components/index/index.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

import { FooterComponent } from './components/shared/footer/footer.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HeroComponent } from './components/shared/hero/hero.component';
import { EnableCookiesModalComponent } from './components/shared/enable-cookies-modal/enable-cookies-modal.component';
import { ProgressBarComponent } from './components/shared/progress-bar/progress-bar.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { HttpInterceptorService } from './services/http-interceptor/http-interceptor.service';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { CancelComponent } from './components/cancel/cancel.component';
import { FormProcessingComponent } from './components/shared/form-processing/form-processing/form-processing.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateAccountComponent,
    TrialSignUpComponent,
    SignInComponent,
    FooterComponent,
    NavbarComponent,
    HeroComponent,
    IndexComponent,
    EnableCookiesModalComponent,
    ProgressBarComponent,
    PageNotFoundComponent,
    ForgetPasswordComponent,
    CancelComponent,
    FormProcessingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
