import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  getSignUpSplitScenario() {
    let source = '';
    let scenario = 'TRIAL_SIGNUP';
    let isRoku = false;
    let isSamsung = false;
    let rokuSpecial = false;
    let costcoSpecial = false;
    let operaSpecial = false;
    let bestbuySpecial = false;

    // source = queryStringToObject().source;
    if (this.router.url.includes('roku')) {
      source = 'roku';
    } else if (this.router.url === 'samsung') {
      source = 'samsung';
    }

    rokuSpecial = window.location.pathname.indexOf('-r') > -1;
    costcoSpecial = window.location.pathname.indexOf('-c') > -1;
    operaSpecial = window.location.pathname.indexOf('-o') > -1;
    bestbuySpecial = window.location.pathname.indexOf('-b') > -1;

    if (source === 'roku') {
      isRoku = true;
      scenario = 'ROKU_TRIAL_SIGNUP';
    } else if (rokuSpecial) {
      scenario = 'ROKU60_TRIAL_SIGNUP';
    } else if (costcoSpecial) {
      scenario = 'COSTCO_TRIAL_SIGNUP';
    } else if (source === 'samsung') {
      isSamsung = true;
      scenario = 'SAMSUNG_TRIAL_SIGNUP';
    } else if (operaSpecial) {
      scenario = 'OPERA_TRIAL_SIGNUP';
    } else if (bestbuySpecial) {
      scenario = 'BESTBUY_TRIAL_SIGNUP';
    } else {
      isRoku = false;
      isSamsung = false;
      scenario = 'TRIAL_SIGNUP';
    }

    return scenario;
  }

  getOperationalScenario() {
    const operationalScenario = queryStringToObject().OperationalScenario;
    let scenario = 'SIGNIN';
    // operationalScenario =
    //   operationalScenario === "ACCOUNT" ? "ACCOUNT" :
    //     operationalScenario === "CANCEL" ? "CANCEL" :
    //       operationalScenario === "STORE" ? "STORE" :
    //         "SIGNIN";
    switch (operationalScenario) {
      case 'ACCOUNT':
        scenario = 'ACCOUNT';
        break;
      case 'CANCEL' :
        scenario = 'CANCEL';
        break;
      case 'STORE' :
        scenario = 'STORE';
        break;
      default:
        scenario = 'SIGNIN';
        break;
    }
    return scenario;
  }

  getSignInJSONData() {
    return {
      'App': {
        'AppVersion': 'Sign-Up-Website'
      },
      'Credentials': {
        // 'Username': $('#Username').val(),
        // 'Password': $('#Password').val()
      },
      'Request': {
        'SplitScenario': this.getSignUpSplitScenario(),
        'OperationalScenario': this.getOperationalScenario()
      }
    };
  }

  onSubmit() {
    // $('.form-signin').validate({
    //   submitHandler: function (form, e) {

        // const operationalScenario = queryStringToObject().OperationalScenario;
        // operationalScenario =
        //   operationalScenario === "ACCOUNT" ? "ACCOUNT" :
        //     operationalScenario === "CANCEL" ? "CANCEL" :
        //       operationalScenario === "STORE" ? "STORE" :
        //         "SIGNIN";

        // var SignInJSONData = {
        //   "App": {
        //     "AppVersion": "Sign-Up-Website"
        //   },
        //   "Credentials": {
        //     'Username': $('#Username').val(),
        //     "Password": $('#Password').val()
        //   },
        //   "Request": {
        //     "SplitScenario": SignUpSplitScenario,
        //     'OperationalScenario': operationalScenario
        //   }
        // };

        // if (!docCookies.enabled()) {
          // $('#enableCookiesModal').modal();
        // } else {
          // $.ajax({
          //   type: 'POST',
          //   data: JSON.stringify(SignInJSONData),
          //   contentType: 'application/json; charset=utf-8',
          //   url: '/initializeapp',
          //   dataType: 'json',
          //   xhrFields: {
          //     withCredentials: true
          //   },
          //   crossDomain: true,
          //   success: function (json) {
          //     switch (json.RecommendedAction.Type) {
          //       case 'HomePage':
          //         window.location.replace(acornTVHomeLink);
          //         break;
          //       case 'BillingAddress':
          //       case 'TrialSignup':
          //         window.location.replace('/trialsignup.html');
          //         break;
          //       case 'DeviceAuthorization':
          //         window.location.replace('/deviceauthorization.html');
          //         break;
          //       case 'ExpiredSignup':
          //         window.location.replace(membershipURL());
          //         break;
          //       case 'Account':
          //         window.location.replace(accountURL());
          //         break;
          //       case 'Store':
          //         window.location.replace(storeURL());
          //         break;
          //       case 'Cancel':
          //         window.location.replace(cancelURL());
          //         break;
          //       default:
          //         $('.form-processing').html('<div class="alert alert-error">There is a problem with your account. You can preview Acorn TV content <a href="' + acornTVURL() + '"><strong>here</strong></a>. If you need further assistance please <a href="' + contactUsURL() + '"><strong>contact us</strong></a>.</div>');
          //     }

          //   },
          //   error: function (xhr, status, errorThrown) {
          //     $('.control-group').show();
          //     try {
          //       alertMsg = $.parseJSON(xhr.responseText);
          //       $('.alert-info').remove();
          //       $('.form-processing').prepend('<div class="alert alert-error">' + alertMsg.error + '</div>');
          //     } catch (e) {
          //       // console.log("e: " + e);
          //     }
          //   }
          // });
        // }

    //     return false;
    //   }
    // });
  }

}
