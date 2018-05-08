import { Component, OnInit } from '@angular/core';

import docCookies from 'doc-cookies';

@Component({
  selector: 'app-enable-cookies-modal',
  templateUrl: './enable-cookies-modal.component.html',
  styleUrls: ['./enable-cookies-modal.component.scss']
})
export class EnableCookiesModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.activate();
  }

  activate() {
    if (!this.docCookiesEnable()) {
      // ng-bootstrap is needed to do modal.open() without jquery
    }
  }

  docCookiesEnable() {
    const cookieKey = 'testCookies';
    let cookiesEnabled = false;
    const now = Date.now();

    docCookies.setItem(cookieKey, now);
    cookiesEnabled = docCookies.hasItem(cookieKey) && (docCookies.getItem(cookieKey) === now);
    docCookies.removeItem(cookieKey);

    return cookiesEnabled;
  }

}
