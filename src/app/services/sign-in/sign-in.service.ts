import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  doSignIn(params) {
    const signinData = {
      username: params.username,
      password: params.password
    };
    const data = this.getSignInJSONData(signinData);
    const httpParams = {
      withCredentials: true,
      crossDomain: true
    };
    return this.http.post('/initializeapp', data, httpParams);
    // return this.http.get('/assets/mock/sign-in/sign-in.json');
  }

  getSignUpSplitScenario() {
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
    let scenario = 'SIGNIN';
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
          scenario = 'SIGNIN';
          break;
      }
    });

    return scenario;
  }

  getSignInJSONData(params) {
    return {
      App: {
        AppVersion: 'Sign-Up-Website'
      },
      Credentials: {
        Username: params.username,
        Password: params.password
      },
      Request: {
        SplitScenario: this.getSignUpSplitScenario(),
        OperationalScenario: this.getOperationalScenario()
      }
    };
  }
}
