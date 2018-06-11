import { Injectable, HostBinding, HostListener, RendererFactory2, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  acornTVURL = '/';
  contactUsURL = '/contactus';

  notify: Subject<boolean> = new Subject<boolean>();
  // displayAlert: boolean;
  @HostBinding('style.display') displayAlert: boolean;

  // @HostListener('ready') serviceReady() {
  //   this.displayAlert = true;
  // }

  private renderer: Renderer2;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private rendererFactory2: RendererFactory2
  ) {
    this.displayAlert = true;
    // this.notify.next(false);
    // https://github.com/angular/angular/issues/17824
    this.renderer = rendererFactory2.createRenderer(null, null);
  }

  onNotify(type) {
    console.log('onNotify', type);
    // this.displayAlert = false;
    // this.notify.next(true);
  }

  initializeApp(params) {
    const data = this.getInitializeAppData(params);
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

  getInitializeAppData(params) {
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


  // recommendedActionType(type) {
  //   console.log(`navigate to `, type);
  //   // this.router.navigateByUrl('/createaccount');
  //   return false;
  //   // switch (type) {
  //   //   case 'HomePage':
  //   //     // window.location.replace(acornTVHomeLink);
  //   //     this.router.navigateByUrl('/');
  //   //     break;
  //   //   case 'BillingAddress':
  //   //   case 'TrialSignup':
  //   //     // window.location.replace('/trialsignup.html');
  //   //     console.log(type);
  //   //     this.router.navigateByUrl('trialsignup');
  //   //     break;
  //   //   case 'DeviceAuthorization':
  //   //     window.location.replace('/deviceauthorization.html');
  //   //     this.router.navigateByUrl('/deviceauthorization');
  //   //     break;
  //   //   case 'ExpiredSignup':
  //   //     // window.location.replace(membershipURL());
  //   //     this.router.navigateByUrl('');
  //   //     break;
  //   //   case 'Account':
  //   //     // window.location.replace(accountURL());
  //   //     this.router.navigateByUrl('');
  //   //     break;
  //   //   case 'Store':
  //   //     // window.location.replace(storeURL());
  //   //     this.router.navigateByUrl('');
  //   //     break;
  //   //   case 'Cancel':
  //   //     // window.location.replace(cancelURL());
  //   //     this.router.navigateByUrl('/cancel');
  //   //     break;
  //   //   default:
  //   //     return false;
  //   // }
  // }
  recommendedActionType(type) {
    console.log(`navigate to recommendedActionType`, type);
    // this.router.navigateByUrl('/trialsignup');
    // return false;
    switch (type) {
      case 'HomePage':
        // window.location.replace(acornTVHomeLink);
        // https://medium.com/@adrianfaciu/using-the-angular-router-to-navigate-to-external-links-15cc585b7b88
        this.router.navigate(
          ['/externalRedirect', { externalUrl: 'https://acorn.tv/' }],
          {
            skipLocationChange: true
          }
        );
        break;
      case 'BillingAddress':
      case 'TrialSignup':
        // window.location.replace('/trialsignup.html');
        console.log(type);
        this.router.navigateByUrl('trialsignup');
        break;
      case 'DeviceAuthorization':
        // window.location.replace('/deviceauthorization.html');
        this.router.navigateByUrl('/deviceauthorization');
        break;
      case 'ExpiredSignup':
        // window.location.replace(membershipURL());
        this.router.navigate(
          [
            '/externalRedirect',
            { externalUrl: 'https://store.acorn.tv/#membership' }
          ],
          {
            skipLocationChange: true
          }
        );
        break;
      case 'Account':
        // window.location.replace(accountURL());
        this.router.navigate(
          ['/externalRedirect', { externalUrl: 'https://account.acorn.tv/' }],
          {
            skipLocationChange: true
          }
        );
        break;
      case 'Store':
        // window.location.replace(storeURL());
        this.router.navigate(
          ['/externalRedirect', { externalUrl: 'https://store.acorn.tv/' }],
          {
            skipLocationChange: true
          }
        );
        break;
      case 'Cancel':
        // window.location.replace(cancelURL());
        this.router.navigateByUrl('/cancel');
        break;
      default:
        return false;
    }

  //   CREATE ACCOUNT PAGE
  //   switch (type) {
  //     case 'HomePage':
  //       // window.location.replace(acornTVHomeLink);
  //       this.router.navigateByUrl('/');
  //       break;
  //     case 'BillingAddress':
  //     case 'TrialSignup':
  //       // if ($scope.rokuSpecial) {
  //       //   window.location.replace('/trialsignup-r.html');
  //       // } else if ($scope.costcoSpecial) {
  //       //   window.location.replace('/trialsignup-c.html');
  //       // } else if ($scope.promoSpecial) {
  //       //   window.location.replace('/trialsignup-p.html');
  //       // } else if ($scope.operaSpecial) {
  //       //   window.location.replace('/trialsignup-o.html');
  //       // } else if ($scope.catalogSpecial) {
  //       //   window.location.replace('/trialsignup-g.html');
  //       // } else if ($scope.bestbuySpecial) {
  //       //   window.location.replace('/trialsignup-b.html');
  //       // } else {
  //       //   window.location.replace('/trialsignup.html');
  //       // }
  //       this.router.navigateByUrl('/trialsignup');
  //       break;
  //     case 'DeviceAuthorization':
  //       // window.location.replace('/deviceauthorization.html');
  //       this.router.navigateByUrl('/deviceauthorization');
  //       break;
  //     case 'ExpiredSignup':
  //       // var storeURL = window.location.hostname.replace('signup', 'store');
  //       // window.location.replace(storeURL + '/#membership');
  //       // https://medium.com/@adrianfaciu/using-the-angular-router-to-navigate-to-external-links-15cc585b7b88
  //       this.router.navigate([
  //         '/#membership',
  //         { externalUrl: 'store.acorn.dev' }
  //       ], {
  //           skipLocationChange: true,
  //         });
  //       break;
  //     default:
  //     // $('.alert-info').remove();
  //     // $('.form-processing').prepend(
  //     //   '<div class="alert alert-error">' +
  //     //   ' There is a problem with your account. You can preview Acorn TV content ' +
  //     //   ' <a href="' + acornTVURL() + '">' +
  //     //   '   <strong>here</strong></a>. ' +
  //     //   ' If you need further assistance please <a href="' + contactUsURL() + '">' +
  //     //   ' <strong>contact us</strong></a>.' +
  //     //   '</div>'
  //     // );
  //     // $('html, body').animate({
  //     //   scrollTop: 0
  //     // }, 'slow');
  //   }
  }

  notification(msg, type = 'error') {
    const div = this.renderer.createElement('div');
    this.renderer.addClass(div, 'alert');
    this.renderer.addClass(div, 'alert-' + type);

    const text = this.renderer.createText(msg);
    this.renderer.appendChild(div, text);

    const form = document.querySelector('form');

    console.log(div);
    console.log(form.nativeElement, form.parentNode);

    const parent = form.parentNode;
    const refChild = form;

    this.renderer.insertBefore(parent, div, refChild);
  }
}
