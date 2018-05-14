import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trial-sign-up',
  templateUrl: './trial-sign-up.component.html',
  styleUrls: ['./trial-sign-up.component.scss']
})
export class TrialSignUpComponent implements OnInit {

  step: number;

  constructor() { }

  ngOnInit() {
    this.step = 2;
  }

}
