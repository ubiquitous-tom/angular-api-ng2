import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { TrialSignUpComponent } from './components/trial-sign-up/trial-sign-up.component';
import { IndexComponent } from './components/index/index.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

import { FooterComponent } from './components/shared/footer/footer.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HeroComponent } from './components/shared/hero/hero.component';
import { EnableCookiesModalComponent } from './components/shared/enable-cookies-modal/enable-cookies-modal.component';
import { ProgressBarComponent } from './components/shared/progress-bar/progress-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    CreateAccountComponent,
    TrialSignUpComponent,
    SignInComponent,
    FooterComponent,
    NavbarComponent,
    HeroComponent,
    IndexComponent,
    EnableCookiesModalComponent,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
