import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialSignUpComponent } from './trial-sign-up.component';

describe('TrialSignUpComponent', () => {
  let component: TrialSignUpComponent;
  let fixture: ComponentFixture<TrialSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrialSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
