
import { Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
declare global {
  interface Window { ResizeObserver: any; }
}

// nzm dal se koristi moguce da ne
// a cinimi se da sam koristio da znam kada je div resized
interface ResizedEvent {
  // ovo dobijam od ResizeObserver
  bottom?: number;
  height?: number;
  left?: number;
  right?: number;
  top?: number;
  width?: number;
  x?: number;
  y?: number;
}
@Directive({ selector: '[resized]' })
export class ApcResized implements OnInit, OnDestroy {

  constructor(
    private readonly element: ElementRef
  ) { }

  @Output()
  readonly resized = new EventEmitter<ResizedEvent>();

  observer: any;

  ngOnInit() {
    this.observer = new window.ResizeObserver(entries => {
      this.resized.emit(entries[0].contentRect);
    });

    this.observer.observe(this.element.nativeElement);
  }

  ngOnDestroy() {
    this.observer.unobserve(this.element.nativeElement);
    this.observer = null;
  }
}