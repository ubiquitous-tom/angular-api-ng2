import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  Renderer2,
  ViewChild,
  ViewChildren,
  QueryList,
  HostBinding,
  ViewContainerRef,
  ComponentRef
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { map, filter, scan, subscribeOn } from 'rxjs/operators';

import * as $ from 'jquery';
import { SignUpService } from '../../services/sign-up/sign-up.service';
import { SignIn } from '../../services/sign-in/sign-in';

import { DomService } from '../../services/dom/dom.service';
import { FormProcessingComponent } from '../shared/form-processing/form-processing.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, AfterViewInit {
  private static readonly errorMessages = {
    required: () => 'This field is required',
    email: () => 'This must be a valid email',
    pattern: params => 'The required pattern is: ' + params.requiredPattern
  };

  // public static readonly acornTVURL = '/';
  // public static readonly contactUsURL = '/contactus';

  // @ViewChild('formSignin') formSignin: ElementRef;
  // @ViewChildren('formSignin') formSignin: QueryList<SignInComponent>;

  private users: Observable<any>;
  private stuff: Observable<any>;

  public signInForm: FormGroup;
  public signInState: boolean;
  public acornTVURL: string;
  public contactUsURL: string;

  private loaderContainerRef: ComponentRef<FormProcessingComponent>;
  private loaderContainerElement: HTMLElement;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private el: ElementRef,
    // private renderer: Renderer2,
    private signUpService: SignUpService,
    private domService: DomService
  ) {
    // this.signUpService.notify
    //   .subscribe({
    //     next: result => {
    //       console.log('success', result);
    //     },
    //     error: (error) => {
    //       console.log('error', error);
    //     },
    //     complete: () => {
    //       console.log('complete');
    //     }
    //   });

    // https://medium.com/@caroso1222/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6
    // https://github.com/jdjuan/ng-notyf/blob/master/src/notyf/shared/notyf.service.ts
    this.loaderContainerRef = this.domService.createComponentRef(
      FormProcessingComponent
    );
    this.loaderContainerElement = this.domService.getDomElementFromComponentRef(
      this.loaderContainerRef
    );
    // this.domService.addChild(this.loaderContainerElement);
  }

  ngOnInit() {
    this.createForm();

    this.signInState = true;

    this.acornTVURL = this.signUpService.acornTVURL;
    this.contactUsURL = this.signUpService.contactUsURL;

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

  ngAfterViewInit() {
    // console.log(this.formSignin);
  }

  createForm() {
    // Another way using Validators.compose()
    // this.signInForm = this.fb.group({
    //   Username: ['', Validators.compose([Validators.required, Validators.email])],
    //   Password: ['', Validators.required]
    // });
    this.signInForm = this.fb.group({
      Username: this.fb.control('a@a.com', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ]),
      Password: this.fb.control('a', [Validators.required])
    });
  }

  onFormSubmit() {
    this.domService.addChildTo(
      this.loaderContainerElement,
      this.el.nativeElement.querySelector('form'),
      'afterbegin'
    );
    console.log(this.signInForm);
    const username = this.signInForm.controls['Username'].value;
    const password = this.signInForm.controls['Password'].value;
    const signInParams = {
      username: username,
      password: password
    };

    this.signUpService.initializeApp(signInParams)
    .subscribe(
      success => {
        console.log(success);
        const type = success.RecommendedAction.Type;
        this.signUpService.recommendedActionType(type);
      },
      error => {
        console.log(error);
        this.domService.destroyRef(this.loaderContainerRef, 0);

        // const div = this.renderer.createElement('div');
        // this.renderer.addClass(div, 'alert');
        // this.renderer.addClass(div, 'alert-error');
        // const text = this.renderer.createText(error.error);
        // this.renderer.appendChild(div, text);
        // console.log(div);
        // console.log(this.signInForm.nativeElement);

        // const parent = this.signInForm.nativeElement.parentNode;
        // const refChild = this.signInForm.nativeElement;
        // this.renderer.insertBefore(parent, div, refChild);
      },
      () => {
        console.log('complete');
        // this.domService.destroyRef(this.loaderContainerRef, 0);
      }
    );
  }
}
