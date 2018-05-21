import { DomStyle } from './dom-style';
import {
  Injectable,
  Injector,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  ApplicationRef,
  ComponentRef
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomService {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  createComponentRef(component: any): ComponentRef<any> {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);
    this.appRef.attachView(componentRef.hostView);
    return componentRef;
  }

  getDomElementFromComponentRef(componentRef: ComponentRef<any>): HTMLElement {
    return (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
  }

  addChild(child: HTMLElement, parent: HTMLElement = document.body) {
    parent.appendChild(child);
  }

  addChildTo(child: HTMLElement, parentNode: HTMLElement, position: string = 'afterend') {
    switch (position) {
      case 'beforebegin':
        parentNode.insertAdjacentElement(position, child);
        break;
      case 'afterbegin':
        parentNode.insertAdjacentElement(position, child);
        break;
      case 'beforeend':
        parentNode.insertAdjacentElement(position, child);
        break;
      case 'afterend':
      default:
        parentNode.insertAdjacentElement('afterend', child);
        break;
    }
  }

  destroyRef(componentRef: ComponentRef<any>, delay: number) {
    setTimeout(() => {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    }, delay);
  }

  setDynamicStyles(styles: DomStyle, componentRef: ComponentRef<any>) {
    Object.keys(styles).forEach(cssRule => {
      const cssValue = styles[cssRule];
      componentRef.instance.renderer.setElementStyle(
        componentRef.instance.elementRef.nativeElement,
        cssRule,
        cssValue
      );
    });
  }
}
