import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  currentUrl: string;

  constructor(private router: Router) {
    this.router = router;
  }

  ngOnInit() {
    console.log(this.router.url, this.router);
    this.currentUrl = this.router.url;
  }

  checkSignInUrl() {
    return this.currentUrl.includes('signin');
  }

  showLink(link: string) {
    return this.currentUrl === link;
  }

}
