import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
// import { NgForm } from "@angular/forms";
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

import {
  Observable,
  Subject,
  asapScheduler,
  pipe,
  of,
  from,
  interval,
  merge,
  fromEvent
} from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';

import * as $ from 'jquery';
import { Options } from 'selenium-webdriver';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  private static readonly errorMessages = {
    'required': () => 'This field is required',
    'email': () => 'This must be a valid email',
    'pattern': (params) => 'The required pattern is: ' + params.requiredPattern
  };

  // @Input() Username: string;
  // @Input() Password: string;

  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.createForm();
  }

  ngOnInit() {
    // https://stackoverflow.com/questions/46922181/how-to-use-fancybox-with-webpack
    // window.jQuery = $;  <-- This is what do the magic!!
    // const colors = ['green', 'blue', 'black', 'white'];
    // $.each(colors, function(ind, color) {
    //   console.log(ind, color);
    // });

    // Observable.of([1, 2, 3]).subscribe(x => console.log(x));
    // Observable.from([1, 2, 3]).subscribe(x => console.log(x));
    // Observable.of(1, 2, 3).subscribe(x => console.log(x));
    // Observable.from(1, 2, 3).subscribe(x => console.log(x));
  }

  createForm() {
    // Another way using Validators.compose()
    // this.signUpForm = this.fb.group({
    //   Username: ['', Validators.compose([Validators.required, Validators.email])],
    //   Password: ['', Validators.required]
    // });
    this.signUpForm = this.fb.group({
      Username: this.fb.control('test@test.com', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ]),
      Password: this.fb.control('test', [Validators.required])
    });
  }

  onFormSubmit() {
    console.log(this.signUpForm);
    const username = this.signUpForm.controls['Username'].value;
    const password = this.signUpForm.controls['Password'].value;
    const signInParams = {
      username: username,
      password: password
    };
    console.log(username, password);

    const signInData = this.getSignInJSONData(signInParams);
    console.log(signInData);

    // this.http.get('https://jsonplaceholder.typicode.com/posts')
    //   .subscribe(posts => {
    //     posts.forEach(element => {
    //       console.log(element);
    //     });
    //   });

    const postId = 2;
    this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts/' + postId)
      .subscribe(post => {
        console.log(post);
      });

    // onFormSubmit(f: NgForm)
    // console.log(onFormSubmit()'NgForm', f);
    // console.log('form values', f.value);
    // console.log('form valid', f.valid);
    // // console.log('username', f.username);
    // // console.log('password', f.password);
    // console.log('controls Username', f.controls['Username'].value);
    // console.log('controls Password', f.controls['Password'].value);
    // console.log('value Username', f.value.Username);
    // console.log('value Password', f.value.Password);
    // if (!f.value.Username) {
    //   console.log('no Username');
    //   f.controls['Username'].setErrors({'incorrect': true});
    // }
    // if (!f.value.Password) {
    //   console.log('no Password');
    //   f.controls['Password'].setErrors({'incorrect': true});
    // }
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

  getSignInJSONData(params) {
    return {
      'App': {
        'AppVersion': 'Sign-Up-Website'
      },
      'Credentials': {
        'Username': params.username,
        'Password': params.password
      },
      'Request': {
        'SplitScenario': this.getSignUpSplitScenario(),
        'OperationalScenario': this.getOperationalScenario()
      }
    };
  }

  doSignIn() {
    const header  = new Headers();
    header.set('Content-Type', 'application/json; charset=utf-8');

    // const params = new HttpParams();
    // params.set('widthCredentials', 'true');
    // params.set('crossDomain', 'true');
    const params = {
      withCredentials: true,
      crossDomain: true,
    };
    this.http.post('/initializeapp', this.getSignInJSONData, params);
  }

  stuff() {
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
          //         $('.form-processing')
                        // .html('
                        //   <div class="alert alert-error">There is a problem with your account.
                        //    You can preview Acorn TV content
                        //      <a href="' + acornTVURL() + '">
                        //       <strong>here</strong>
                        //     </a>.
                        //      If you need further assistance please
                        //      <a href="' + contactUsURL() + '">
                        //       <strong>contact us</strong>
                        //     </a>.
                        //   </div>
                        // ');
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
