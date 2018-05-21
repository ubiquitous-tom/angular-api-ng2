import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-form-processing',
  templateUrl: './form-processing.component.html',
  styleUrls: ['./form-processing.component.scss']
})
export class FormProcessingComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
  }

}
