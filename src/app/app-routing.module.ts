import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { TrialSignUpComponent } from './components/trial-sign-up/trial-sign-up.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';

const routes: Routes = [
  // { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: '', component: IndexComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'createaccount', component: CreateAccountComponent },
  { path: 'trialsignup', component: TrialSignUpComponent },
  { path: 'forgetpassword', component: ForgetPasswordComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      // { enableTracing: true }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
