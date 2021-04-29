import { DOCUMENT } from '@angular/common';
import { ComponentFactoryResolver, ComponentRef, Inject, Injectable, Injector } from '@angular/core';

// mozda da ga provajdujem u main service
@Injectable({ providedIn: 'root' })
export class ApcInjector {

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) { }

  inject(component, input, host = this.document.body): ComponentRef<any> {
    const factory = this.resolver.resolveComponentFactory(component);
    const componentRef: ComponentRef<any> = factory.create(this.injector);

    for (const key in input) {
      componentRef.instance[key] = input[key];
    }
    componentRef.instance.componentRef = componentRef;
    componentRef.hostView.detectChanges();

    host.appendChild(componentRef.location.nativeElement);
    // this.document.body.appendChild(componentRef.location.nativeElement);
    return componentRef;
  }

  remove(nativeElement, host = this.document.body) {
    host.removeChild(nativeElement);
    // this.document.body.removeChild(nativeElement);
  }
}
