import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SignUpService } from '../sign-up/sign-up.service';

@Injectable({
  providedIn: 'root'
})
export class CreateAccountService {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private signUpService: SignUpService
  ) { }

  doCreateAccount(params) {
    const createAccountData = {
      username: params.username,
      password: params.password,
      frmmktgoptin: params.frmmktgoptin,
      promoCode: params.promoCode,
    };
    const data = this.getCreateAccountJSONData(createAccountData);
    const httpParams = {
      withCredentials: true,
      crossDomain: true,
    };
    return this.http.post('/initializeapp', data, httpParams);
    // return this.http.get('/assets/mock/sign-in/sign-in.json');
  }

  getSplitScenario() {
    let source = '';
    let scenario = 'TRIAL_SIGNUP';
    let rokuSpecial = false;
    let costcoSpecial = false;
    let operaSpecial = false;
    let bestbuySpecial = false;

    this.route.queryParamMap.subscribe(params => {
      source = params.get('source');
    });

    rokuSpecial = window.location.pathname.indexOf('-r') > -1;
    costcoSpecial = window.location.pathname.indexOf('-c') > -1;
    operaSpecial = window.location.pathname.indexOf('-o') > -1;
    bestbuySpecial = window.location.pathname.indexOf('-b') > -1;

    if (source === 'roku') {
      scenario = 'ROKU_TRIAL_SIGNUP';
    } else if (rokuSpecial) {
      scenario = 'ROKU60_TRIAL_SIGNUP';
    } else if (costcoSpecial) {
      scenario = 'COSTCO_TRIAL_SIGNUP';
    } else if (source === 'samsung') {
      scenario = 'SAMSUNG_TRIAL_SIGNUP';
    } else if (operaSpecial) {
      scenario = 'OPERA_TRIAL_SIGNUP';
    } else if (bestbuySpecial) {
      scenario = 'BESTBUY_TRIAL_SIGNUP';
    }

    return scenario;
  }

  getOperationalScenario() {
    let scenario = 'CREATE_ACCOUNT';
    this.route.queryParamMap.subscribe(params => {
      const operationalScenario = params.get('operationalScenario');
      switch (operationalScenario) {
        case 'ACCOUNT':
          scenario = 'ACCOUNT';
          break;
        case 'CANCEL':
          scenario = 'CANCEL';
          break;
        case 'STORE':
          scenario = 'STORE';
          break;
        default:
          scenario = 'CREATE_ACCOUNT';
          break;
      }
    });

    return scenario;
  }

  getCreateAccountJSONData(params) {
    return {
      App: {
        AppVersion: 'Sign-Up-Website'
      },
      Credentials: {
        Username: params.username,
        Password: params.password
      },
      Request: {
        SplitScenario: this.getSplitScenario(),
        OperationalScenario: this.getOperationalScenario()
      },
      Account: {
        MarketingOptIn: params.mktgoptin
      },
      PromoCode: {
        Code: params.promoCode
      }
    };
  }

  errorHandling(error) {
    console.log(error, error.error.error);
    const errorMsg = error.error.error;
    let msg = 'Oops! Looks like you may have entered some information incorrectly.';


      if (errorMsg.indexOf('Multiple Registration Same Ip') > -1) {
        msg = ' Our records indicate that you have already received a free trial.';
      } else if (errorMsg.indexOf('Account already created') > -1) {
        msg = ' There is an account already created with the email you entered. Please sign in or check your signup email.';
      } else if (errorMsg.indexOf('PromotionCode') > -1) {
        msg = ' Please make sure there are no illegal characters (including spaces) in the promo code.';
      } else if (errorMsg.indexOf('the Promo Code you entered is no longer available') > -1) {
        msg = 'We\'re sorry but the Promo Code you entered is no longer available. Please check what you typed in or remove it.';
      } else if (errorMsg.indexOf('Invalid Costco Promo Code') > -1) {
        msg = 'We\'re sorry but the Costco Promo Code you entered invalid. Please check what you typed.';
      } else if (errorMsg.indexOf('null') > -1) {
        // if (createForm.promo_code.length > 0) {
        //   msg = ' Please make sure there are no illegal characters (including spaces) in the promo code. ';
        // } else {
          msg = ' Please make sure there are no illegal characters in the form fields below. ';
        // }
      } else {
        msg = ' Please check the highlighted fields. ' + errorMsg;
      }

      this.signUpService.notification(msg);

      // $('html, body').animate({scrollTop: 0}, 'slow');
      window.scrollTo(0, 0);
  }
}
