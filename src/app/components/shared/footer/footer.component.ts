import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  year: number;

  constructor() { }

  ngOnInit() {
    this.year = this.getFullYear();
  }

  getFullYear() {
    const now = new Date();
    return now.getFullYear();
  }

}
