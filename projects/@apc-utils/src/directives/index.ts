export * from './Resizable';
export * from './Popup-position';
export * from './Numbers-only';
export * from './Resized';
export * from './Disable-form';
export * from './Resize';


// proveri nzm zasta je korisceno
// za netmon ne treba
// @Directive({ selector: '[apcDimensions]' })
// export class ApcDimensionsDirective implements OnInit, OnDestroy {

//   constructor(private el: ElementRef) { }
//   observer: any;

//   ngOnInit() {
//     this.setSizes();
//     this.observer = new window.ResizeObserver(entries => {
//       this.setSizes();
//     });

//     this.observer.observe(this.el.nativeElement.parentElement);
//   }

//   @HostListener('window:resize', [])
//   setSizes() {
//     const { offsetHeight, offsetWidth } = this.el.nativeElement.parentElement;
//     this.el.nativeElement.style.width = offsetWidth + 'px';
//     this.el.nativeElement.style.height = offsetHeight + 'px';
//   }

//   ngOnDestroy() {
//     this.observer.unobserve(this.el.nativeElement);
//     this.observer = null;
//   }
// }


// @Directive({ selector: '[apcFor][apcForOf]' })
// export class ApcForDirective {
//   constructor(private view: ViewContainerRef, private template: TemplateRef<any>) { }
//   // tslint:disable-next-line: no-input-rename
//   @Input() apcIf: any;
//   // radi sa ng-template, nece da radi sa *apcFor
//   @Input() set apcForOf(list) {
//     console.log(this.apcIf);

//     this.view.clear();
//     list.forEach((item, index) => {
//       if (item === this.apcIf) {
//         this.view.createEmbeddedView(this.template, { $implicit: item, index });
//       }
//     });
//   }
// }

// @Directive({ selector: 'apcTab' })
// export class ApcTabDirective implements OnInit {
//   constructor(private el: ElementRef, private renderer: Renderer2) { }

//   @Output() closed = new EventEmitter();
//   ngOnInit(): void {
//     this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '0');
//     setTimeout(() => this.el.nativeElement.focus(), 0);
//   }

//   // @HostListener('focusout', ['$event'])
//   close(event) {
//     if (!(event.currentTarget?.contains(event.relatedTarget))) {
//       this.closed.emit(true);
//     }
//   }
// }



// znm za sta i da li se koristi
// koristio ga za resolv new graph
// ali sam ga zamenio
// export class ApcPromise {
//   promise;
//   resolve;
//   reject;

//   constructor() {
//     this.promise = new Promise((resolve, reject) => {
//       this.reject = reject;
//       this.resolve = resolve;
//     });
//   }
// }
