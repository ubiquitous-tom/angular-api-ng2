import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProcessingComponent } from './form-processing.component';

describe('FormProcessingComponent', () => {
  let component: FormProcessingComponent;
  let fixture: ComponentFixture<FormProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
