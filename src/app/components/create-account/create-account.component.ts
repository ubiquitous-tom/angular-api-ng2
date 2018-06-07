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

  //   if (!docCookies.enabled()) {
  //     $('#enableCookiesModal').modal();
  //   }
  //   else {
  //     $.ajax({
  //       type: "POST",
  //       data: JSON.stringify(CreateAccountJSONData),
  //       contentType: "application/json; charset=utf-8",
  //       url: "/initializeapp",
  //       dataType: "json",
  //       xhrFields: {
  //         withCredentials: true
  //       },
  //       crossDomain: true,
  //       success: function (json) {
  //         switch (json.RecommendedAction.Type) {
  //           case "HomePage":
  //             window.location.replace(acornTVHomeLink);
  //             break;
  //           case "BillingAddress":
  //           case "TrialSignup":
  //             if ($scope.rokuSpecial) {
  //               window.location.replace("/trialsignup-r.html");
  //             } else if ($scope.costcoSpecial) {
  //               window.location.replace("/trialsignup-c.html");
  //             } else if ($scope.promoSpecial) {
  //               window.location.replace("/trialsignup-p.html");
  //             } else if ($scope.operaSpecial) {
  //               window.location.replace("/trialsignup-o.html");
  //             } else if ($scope.catalogSpecial) {
  //               window.location.replace("/trialsignup-g.html");
  //             } else if ($scope.bestbuySpecial) {
  //               window.location.replace("/trialsignup-b.html");
  //             } else {
  //               window.location.replace("/trialsignup.html");
  //             }
  //             break;
  //           case "DeviceAuthorization":
  //             window.location.replace("/deviceauthorization.html");
  //             break;
  //           case "ExpiredSignup":
  //             var storeURL = window.location.hostname.replace('signup', 'store');
  //             window.location.replace(storeURL + '/#membership');
  //             break;
  //           default:
  //             $(".alert-info").remove();
  //             $(".form-processing").prepend('<div class="alert alert-error">There is a problem with your account. You can preview Acorn TV content <a href="' + acornTVURL() + '"><strong>here</strong></a>. If you need further assistance please <a href="' + contactUsURL() + '"><strong>contact us</strong></a>.</div>');
  //             $("html, body").animate({
  //               scrollTop: 0
  //             }, "slow");
  //         }
  //       },
  //       error: function (xhr, status, errorThrown) {
  //         formPosted = false;
  //         $(".control-group").show();
  //         try {
  //           $(".alert-info").remove();
  //           $scope.formHasError = true;
  //           $scope.errorMessage = 'Oops! Looks like you may have entered some information incorrectly.';

  //           if (xhr.responseText.indexOf("Multiple Registration Same Ip") > -1) {
  //             $scope.createForm.Username.$setValidity("", false);
  //             $scope.errorMessage = ' Our records indicate that you have already received a free trial.';
  //           }
  //           else if (xhr.responseText.indexOf("Account already created") > -1) {
  //             $scope.createForm.Username.$setValidity("", false);
  //             $scope.errorMessage += ' There is an account already created with the email you entered. Please sign in or check your signup email.';
  //           }
  //           else if (xhr.responseText.indexOf("PromotionCode") > -1) {
  //             $scope.createForm.promo_code.$setValidity("", false);
  //             $scope.errorMessage += ' Please make sure there are no illegal characters (including spaces) in the promo code.';
  //           }
  //           else if (xhr.responseText.indexOf("the Promo Code you entered is no longer available") > -1) {
  //             $scope.createForm.promo_code.$setValidity("", false);
  //             $scope.errorMessage = "We're sorry but the Promo Code you entered is no longer available. Please check what you typed in or remove it.";
  //           }
  //           else if (xhr.responseText.indexOf("Invalid Costco Promo Code") > -1) {
  //             $scope.createForm.promo_code.$setValidity("", false);
  //             $scope.errorMessage = "We're sorry but the Costco Promo Code you entered invalid. Please check what you typed.";
  //           }
  //           else if (xhr.responseText.indexOf("null") > -1) {
  //             if ($scope.createForm.promo_code.length > 0) {
  //               $scope.createForm.promo_code.$setValidity("", false);
  //               $scope.errorMessage += ' Please make sure there are no illegal characters (including spaces) in the promo code. ';
  //             } else {
  //               $scope.errorMessage = ' Please make sure there are no illegal characters in the form fields below. ';
  //             }
  //           }
  //           else {
  //             $scope.errorMessage += ' Please check the highlighted fields. ' + xhr.responseText;
  //           }
  //           $(".form-processing").prepend('<div class="alert alert-error" id="errorMessageDiv" >' + $scope.errorMessage + '</div>');
  //           $("html, body").animate({
  //             scrollTop: 0
  //           }, "slow");
  //         } catch (e) {
  //           //console.log("e: " + e);
  //         }
  //       },
  //       complete: function (xhr, status) { }
  //     });
  //   }
  // };
}
