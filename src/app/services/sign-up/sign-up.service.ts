import { Injectable, HostBinding, HostListener } from '@angular/core';
import { Subject } from 'rxjs';

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

  constructor() {
    this.displayAlert = true;
    // this.notify.next(false);
  }

  onNotify(type) {
    console.log('onNotify', type);
    // this.displayAlert = false;
    // this.notify.next(true);
  }
}
