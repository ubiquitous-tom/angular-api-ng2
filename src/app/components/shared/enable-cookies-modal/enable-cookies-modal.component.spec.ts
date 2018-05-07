import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnableCookiesModalComponent } from './enable-cookies-modal.component';

describe('EnableCookiesModalComponent', () => {
  let component: EnableCookiesModalComponent;
  let fixture: ComponentFixture<EnableCookiesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnableCookiesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnableCookiesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
