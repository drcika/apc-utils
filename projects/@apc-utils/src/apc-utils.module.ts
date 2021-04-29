import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApcResizable, ApcDisableForm, ApcPopupPosition, ApcResized, ApcResize, ApcNumbersOnly } from './directives';
import { ApckeyPipe, ApcValuePipe, FilterObjPipe, TypeofPipe, ApcDatePipe, ApcFilterPipe, IsActivePipe } from './pipes';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ApcResizable, ApcDisableForm, ApcPopupPosition, ApcResized, ApcResize,
    ApckeyPipe, ApcValuePipe, FilterObjPipe, TypeofPipe, ApcDatePipe,
    ApcNumbersOnly, ApcFilterPipe, IsActivePipe
  ],
  exports: [
    ApcResizable, ApcDisableForm, ApcPopupPosition, ApcResized, ApcResize,
    ApckeyPipe, ApcValuePipe, FilterObjPipe, TypeofPipe, ApcDatePipe,
    ApcNumbersOnly, ApcFilterPipe, IsActivePipe
  ]
})
export class ApcUtilsModule { }
