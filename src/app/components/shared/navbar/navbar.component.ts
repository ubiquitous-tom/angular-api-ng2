import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  currentUrl: string;

  constructor(
    private router: Router,
    private aRouter: ActivatedRoute,
    private location: Location
  ) {
    this.router = router;
  }

  ngOnInit() {
    console.log(this.router.url, this.router, this.aRouter);
    this.currentUrl = this.router.url;
  }

  checkSignInUrl() {
    return this.currentUrl.includes('signin');
  }

  displayLink(link: string) {
    return this.location.isCurrentPathEqualTo(link); //this.currentUrl === link;
  }

}
