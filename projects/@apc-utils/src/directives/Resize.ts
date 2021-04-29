import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, EventEmitter, Inject, Input, OnChanges, OnInit, Output, Renderer2 } from '@angular/core';

type ResizeMode = 'vertical' | 'horisontal' | 'both';

@Directive({
  selector: '[apcResize]'
})
// tslint:disable-next-line: directive-class-suffix
export class ApcResize implements OnInit, OnChanges {

  // da bi ubacio i ostale moram onda i top/left pozicije setujem
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) { }

  @Output() apcResize = new EventEmitter();

  @Input() min = 120;
  @Input() max = 500;
  // @Input() apcResizeGrid = true;
  // @Input() contanerWidth: number; // mozda mi nece ni trebati
  // @Input() width: number;
  // @Input() side: 'bottom' | 'right';
  // @Input() height: number;
  // @Input() node: any;

  x = 0;
  y = 0;
  width: number;
  height: number;
  newWidth: number;
  newHeight: number;

  liseners: {
    mousemove?: () => void;
    mouseup?: () => void;
    mousedown?: () => void;
  } = {};

  hendlers: {
    right?: ElementRef,
    bottom?: ElementRef,
    bottomRight?: ElementRef,
  } = {};

  ngOnChanges() { }

  ngOnInit() {
    this.attachHendlers();
  }

  setWidth(e) {
    const newWidth = (e.clientX - this.x) + this.width;
    if (newWidth < this.min || newWidth > this.max) {
      return;
    }
    this.newWidth = newWidth;
    this.renderer.setStyle(this.el.nativeElement, 'width', `${this.newWidth}px`);
  }

  setHeight(e) {
    const newHeight = this.height + (e.clientY - this.y);
    if (newHeight < this.min || newHeight > this.max) {
      return;
    }
    this.newHeight = newHeight;
    this.el.nativeElement.style.height = `${this.newHeight}px`;
  }

  mouseMoveHandler(mode: ResizeMode, e) {

    if (mode === 'horisontal') {
      this.setWidth(e);
    }
    else if (mode === 'vertical') {
      this.setHeight(e);
    }
    else if (mode === 'both') {
      this.setWidth(e);
      this.setHeight(e);
    }

  }

  mouseUpHandler() {
    // Remove the handlers of `mousemove` and `mouseup`
    this.liseners.mousemove();
    this.liseners.mouseup();
    this.apcResize.emit({ width: this.newWidth, height: this.newHeight });
  }

  mouseDownHandler(mode: ResizeMode, e: MouseEvent) {
    // e.preventDefault();
    e.stopPropagation();
    // e.stopImmediatePropagation();

    // Get the current mouse position
    this.width = this.el.nativeElement.offsetWidth;
    this.height = this.el.nativeElement.offsetHeight;
    this.x = e.clientX;
    this.y = e.clientY;

    // Attach the listeners to `document`
    this.liseners.mousemove = this.renderer.listen(this.document, 'mousemove', this.mouseMoveHandler.bind(this, mode));
    this.liseners.mouseup = this.renderer.listen(this.document, 'mouseup', this.mouseUpHandler.bind(this));
  }

  attachHendlers() {
    this.hendlers.bottom = this.addHendler('apc-bottom', 'vertical');
    this.hendlers.right = this.addHendler('apc-right', 'horisontal');
    this.hendlers.bottomRight = this.addHendler('apc-bottom-right', 'both');
  }

  addHendler(className, mode: ResizeMode) {
    const hendler = this.renderer.createElement('div');
    this.renderer.addClass(hendler, 'apc-resize');
    this.renderer.addClass(hendler, className);
    this.liseners.mousedown = this.renderer.listen(hendler, 'mousedown', this.mouseDownHandler.bind(this, mode));
    this.renderer.appendChild(this.el.nativeElement, hendler);

    return hendler;
  }
}
