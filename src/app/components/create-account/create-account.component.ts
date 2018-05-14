import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  public step: number;

  constructor() { }

  ngOnInit() {
    console.log($.fn);
    this.step = 1;
  }

}
