import { Directive, OnInit, ElementRef, OnDestroy, HostListener } from '@angular/core';

@Directive({ selector: '[apcPopup]' })

export class ApcPopupPosition implements OnInit, OnDestroy {

  constructor(private el: ElementRef) { }
  // @Input() event: MouseEvent;

  observer: any;
  _x = 0;
  _y = 0;

  ngOnInit() {
    this.observer = new window.ResizeObserver(entries => {
      // this.event && this.setPosition();
      this.detectScreenSize();
    });

    this.observer.observe(this.el.nativeElement);
  }

  // setPosition() {
  //   // ovo radi samo kada je popup node info
  //   const { clientY, clientX } = this.event;
  //   this.el.nativeElement.style.left = clientX - 8 + 'px'
  //   this.el.nativeElement.style.top = clientY - 8 + 'px'
  // }

  @HostListener('window:resize', [])
  onResize() {
    this.detectScreenSize();
  }

  detectScreenSize() {
    const winHeight = window.innerHeight;
    const winWidth = window.innerWidth;
    const { bottom, right } = this.el.nativeElement.getBoundingClientRect();
    if (right > winWidth || this._x < 0 && winWidth > right) {
      const x = this._x + winWidth - right;
      this._x = x > 0 ? 0 : x;
    }
    if (bottom > winHeight || this._y < 0 && winHeight > bottom) {
      const y = this._y + winHeight - bottom;
      this._y = y > 0 ? 0 : y;
    }

    this.el.nativeElement.style.transform = `translate3d(${this._x}px, ${this._y}px, 0)`;
  }

  ngOnDestroy() {
    this.observer.unobserve(this.el.nativeElement);
    this.observer = null;
  }
}