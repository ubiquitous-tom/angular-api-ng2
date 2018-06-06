import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CreateAccountService {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
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
}
