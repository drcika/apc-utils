import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { DynamicKey } from '../../models';
import { ApcControl, ApcValidators, ApcFormType } from './model';

function getFormArray(arr: Array<ApcControl>, validators: ApcValidators = []): FormArray {
  return new FormArray(arr.map(el => generator(el)), validators);
}

function getFormGroup(FORM: DynamicKey<ApcControl>, validators: ApcValidators = []): FormGroup {
  const newFormGroup: DynamicKey<FormGroup> = {};
  for (const key in FORM) {
    newFormGroup[key] = generator(FORM[key]) as FormGroup;
  }
  return new FormGroup(newFormGroup, validators);
}

function generator(value: ApcControl, validators: ApcValidators = [], disabled = false): FormGroup | FormArray | FormControl {
  if (value instanceof Function) {
    const { value: val, validators: vld = [], disabled: dis = false } = value();
    return generator(val, vld, dis);
  }
  else if (value instanceof Array) {
    return getFormArray(value, validators);
  }
  else if (value instanceof Object) {
    return getFormGroup(value, validators);
  }
  else {
    return new FormControl({ value, disabled }, validators);
  }
}

export function generateForm(value: ApcFormType): FormGroup | FormArray {
  return generator(value) as FormGroup | FormArray;
}
