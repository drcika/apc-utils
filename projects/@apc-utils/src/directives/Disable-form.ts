import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({ selector: '[disableControl]' })
export class ApcDisableForm {

  // @ApcDefer()
  @Input() set disableControl(condition: boolean) {
    const action = condition ? 'disable' : 'enable';
    setTimeout(() => {
      this.ngControl.control[action]();
    }, 0);
  }

  constructor(private ngControl: NgControl) { }
}