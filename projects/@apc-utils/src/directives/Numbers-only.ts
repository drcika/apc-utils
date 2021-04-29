import { Directive, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


// imam 2 vidi sta se za sta koristi i ovoji ih
@Directive({ selector: '[apcNumbersOnly]' })
export class ApcNumbersOnly implements OnInit, OnDestroy {

  constructor(private el: ElementRef) { }
  subs: Subscription;
  // @HostListener('input', ['$event'])
  onInputChange(event) {
    const initalValue = this.el.nativeElement.value;
    const value = +initalValue.replace(/[^0-9]*/g, '');
    const max = +this.el.nativeElement.max;
    const min = +this.el.nativeElement.min;

    // const val = (!!max && value > max) ? max : (!!min && value < min) ? min : value;

    this.el.nativeElement.value = (!!max && value > max) ? max : (!!min && value < min) ? min : value;
    if (initalValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }

  ngOnInit() {
    this.subs = fromEvent(this.el.nativeElement, 'input')
      .pipe(debounceTime(700))
      .subscribe({ next: this.onInputChange.bind(this) });
  }

  ngOnDestroy() {
    this.subs && this.subs.unsubscribe();
  }

}

// nzm za sta je bilo izgleda da se ne koristi
// @Directive({ selector: 'input[apcDoubles]' })
// export class ApcDoubles {

//   constructor(private _el: ElementRef) {  }
//   // mism da je ovaj koriscen za search u reportingu

//   @HostListener('input', ['$event']) onInputChange(event) {
//     const initalValue = this._el.nativeElement.value;
//     this._el.nativeElement.value = initalValue.replace(/[^0-9.]*/g, '').replace(/\.(.*)?\./g, '.$1');
//     if (initalValue !== this._el.nativeElement.value) {
//       event.stopPropagation();
//     }
//   }

// }