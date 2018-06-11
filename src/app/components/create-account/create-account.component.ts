import { Component, OnInit, ElementRef, Renderer2, ComponentRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validator, Validators } from '@angular/forms';
import { DomService } from '../../services/dom/dom.service';
import { CreateAccountService } from '../../services/create-account/create-account.service';
import { FormProcessingComponent } from '../shared/form-processing/form-processing.component';

import * as $ from 'jquery';
import { SignUpService } from '../../services/sign-up/sign-up.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  public step: number;
  public form: FormGroup;

  private loaderContainerRef: ComponentRef<FormProcessingComponent>;
  private loaderContainerElement: HTMLElement;

  constructor(
    private fb: FormBuilder,
    private domService: DomService,
    private signUpService: SignUpService,
    private createAccountService: CreateAccountService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.step = 1;

    this.loaderContainerRef = this.domService.createComponentRef(
      FormProcessingComponent
    );
    this.loaderContainerElement = this.domService.getDomElementFromComponentRef(
      this.loaderContainerRef
    );
  }

  ngOnInit() {
    // console.log($.fn);
    this.form = this.fb.group({
      email: this.fb.group({
        Username: ['test@test.com', [Validators.required, Validators.email]],
        confirm_email: [
          'test@test.com',
          [Validators.required, Validators.email]
        ]
      }),
      password: this.fb.group({
        Password: ['tomtom', [Validators.required, Validators.minLength(6)]],
        confirm_password: [
          'tomtom',
          [Validators.required, Validators.minLength(6)]
        ]
      }),
      promo_code: ['', []],
      mktgoptin: [true, []]
    });
  }

  onSubmit() {
    // console.log('form', this.form);
    // console.log('email', this.form.get('email'));
    // console.log('Username', this.form.controls.email.get('Username'));
    // console.log('Password', this.form.controls.password.get('Password'));
    // console.log('promo_code', this.form.get('promo_code'));
    // console.log('mktgoptin', this.form.get('mktgoptin'));
    // console.log('Username', this.form.get('email').get('Username').hasError('email'));

    this.domService.addChildTo(
      this.loaderContainerElement,
      this.el.nativeElement.querySelector('form'),
      'afterbegin'
    );

    console.log(this.form);
    const username = this.form.controls.email.get('Username').value;
    const password = this.form.controls.password.get('Password').value;
    const mktgoptin = this.form.get('mktgoptin').value;
    const promoCode = this.form.get('promo_code').value;
    const params = {
      username: username,
      password: password,
      mktgoptin: mktgoptin,
      promoCode: promoCode,
    };
    console.log(params);

    // save promoCode in localStorage for the next page

    this.createAccountService
      .doCreateAccount(params)
      .subscribe(
        success => {
          console.log(success);
          this.signUpService.recommendedActionType(success);
        },
        error => {
          this.createAccountService.errorHandling(error);

          this.domService.destroyRef(this.loaderContainerRef, 0);
          const errorMsg = error.error.error;

          // this.signUpService.notification(errorMsg);
        },
        () => {
          console.log('complete');
          this.domService.destroyRef(this.loaderContainerRef, 0);
        }
      );
  }

  // $scope.submitCreateAccount = function () {

  //   var SignUpSplitScenario = "TRIAL_SIGNUP";
  //   var source = queryStringToObject().source;
  //   $scope.rokuSpecial = window.location.pathname.indexOf("-r") > -1;
  //   $scope.costcoSpecial = window.location.pathname.indexOf("-c") > -1;
  //   $scope.promoSpecial = window.location.pathname.indexOf("-p") > -1;
  //   $scope.operaSpecial = window.location.pathname.indexOf("-o") > -1;
  //   $scope.catalogSpecial = window.location.pathname.indexOf("-g") > -1;
  //   $scope.bestbuySpecial = window.location.pathname.indexOf("-b") > -1;
  //   var costcoIdx = window.location.pathname.indexOf("-c");
  //   $scope.expire = window.location.pathname.indexOf("expire") > -1;

  //   //console.log ("costco idx "+costcoIdx);

  //   if (source == "roku") {
  //     SignUpSplitScenario = "ROKU_TRIAL_SIGNUP";
  //   } else if ($scope.rokuSpecial) {
  //     SignUpSplitScenario = "ROKU60_TRIAL_SIGNUP";
  //   } else if (costcoIdx > -1) {
  //     SignUpSplitScenario = "COSTCO_TRIAL_SIGNUP";
  //   } else if (source == "samsung") {
  //     SignUpSplitScenario = "SAMSUNG_TRIAL_SIGNUP";
  //   } else if ($scope.operaSpecial) {
  //     SignUpSplitScenario = "OPERA_TRIAL_SIGNUP";
  //   } else if ($scope.catalogSpecial) {
  //     SignUpSplitScenario = "CATALOG_TRIAL_SIGNUP";
  //   } else if ($scope.bestbuySpecial) {
  //     SignUpSplitScenario = "BESTBUY_TRIAL_SIGNUP";
  //   } else if ($scope.expire) {
  //     SignUpSplitScenario = "";
  //   }

  //   //console.log("SignUpSplitScenario: " + SignUpSplitScenario);

  //   var frmmktgoptin = ($("#mktgoptin").prop('checked')) ? true : false;

  //   var CreateAccountJSONData = {
  //     "App": {
  //       "AppVersion": "Sign-Up-Website"
  //     },
  //     "Credentials": {
  //       "Username": $('#Username').val(),
  //       "Password": $('#Password').val()
  //     },
  //     "Request": {
  //       "SplitScenario": SignUpSplitScenario,
  //       "OperationalScenario": "CREATE_ACCOUNT"
  //     },
  //     "Account": {
  //       "MarketingOptIn": frmmktgoptin
  //     },
  //     "PromoCode": {
  //       "Code": $('#promo_code').val()
  //     }
  //   };

  //   if ($('#promo_code').val()) {
  //     docCookies.setItem('aTVCreateAccountPromoCode', $('#promo_code').val());
  //   }
}
