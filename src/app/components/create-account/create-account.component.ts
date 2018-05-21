import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validator, Validators } from '@angular/forms';

import * as $ from 'jquery';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  public step: number;
  public form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.step = 1;
  }

  ngOnInit() {
    // console.log($.fn);
    this.form = this.fb.group({
      email: this.fb.group({
        Username: ['test@test.com', [Validators.required, Validators.email]],
        confirm_email: ['test@test.com', [Validators.required, Validators.email]]
      }),
      password: this.fb.group({
        Password: ['tomtom', [Validators.required, Validators.minLength(6)]],
        confirm_password: ['tomtom', [Validators.required, Validators.minLength(6)]]
      }),
      promo_code: ['', []],
      mktgoptin: [true, []]
    });
  }

  onSubmit() {

    console.log('form', this.form);
    console.log('email', this.form.get('email'));
    console.log('Username', this.form.controls.email.get('Username'));
    console.log('Username', this.form.get('email').get('Username').hasError('email'));
  }

}
