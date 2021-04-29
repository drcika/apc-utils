import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { generateForm } from './auxiliary';
import { ApcFormType } from './model';

export class ApcForm {

  form: FormGroup | FormArray | FormControl;

  // get value() { return this.form.value; }
  // get invalid() { return this.form.invalid; }

  get(path: string | (string | number)[]): AbstractControl {
    return this.form.get(path) as AbstractControl;
  }

  constructor(config: ApcFormType) {
    this.form = generateForm(config);
  }

  // patchValue(value: any) {
  //   this.form.patchValue(value);
  // }
  // reset() {
  //   this.form.reset();
  //   Object.keys((this.form as FormGroup).controls).forEach(key => {
  //     this.form.get(key).setErrors(null);
  //   });
  // }
}

// import { FormControl, FormGroup, FormArray } from '@angular/forms';

// interface Config {
//   value: any;
//   disabled?: boolean;
//   validators?: any[];
// }

// function withConfig({ value, disabled = false, validators = [] }: Config) {
//   const map: any = [['value', value], ['validators', validators], ['disabled', disabled]];
//   return new Map(map);
// }

// function _getConfig(map) {
//   const [[, value], [, validators], [, disabled]] = [...map];
//   return _getForm(value, validators || null, disabled || false);
// }

// function getFormArray(arr, validators = []) {
//   return new FormArray(arr.map(el => _getForm(el)), validators);
// }

// function getFormGroup(FORM, validators = []) {
//   const newFormGroup = {};
//   for (const key in FORM) {
//     newFormGroup[key] = _getForm(FORM[key]);
//   }
//   return new FormGroup(newFormGroup, validators);
// }

// function _checkFormArray(formArray: FormArray, newFormValue, FORM) {
//   if (newFormValue && newFormValue.length > formArray.length) {
//     formArray.push(_getForm(FORM));
//     _checkFormArray(formArray, newFormValue, FORM);
//   }
// }

// function _checkForm(form: FormGroup, newFormValue, _FORM) {
//   for (const formName in newFormValue) {
//     if (newFormValue[formName] instanceof Array) {
//       if (_FORM[formName]) {
//         _checkFormArray(form.get(formName) as FormArray, newFormValue[formName], _FORM[formName][0]);
//         // recursive check for subFormGroup in formArray
//         newFormValue[formName].forEach((subFormGroup, index) => {
//           _checkForm(((form.get(formName) as FormArray).at(index) as FormGroup), subFormGroup, _FORM[formName][0]);
//         });
//       }
//     } else if (newFormValue[formName] instanceof Object) {
//       if (!(formName in _FORM)) {
//         form.addControl(formName, _getForm(newFormValue[formName]));
//       } else {
//         // recursive check for subFormGroup in formArray
//         for (const subFormName in newFormValue[formName]) {
//           if (!(subFormName in _FORM[formName])) {
//             (form.get(formName) as FormGroup).addControl(subFormName, _getForm(newFormValue[formName][subFormName]));
//           }
//         }
//         _checkForm((form.get(formName) as FormGroup), newFormValue[formName], _FORM[formName]);
//       }
//     }
//   }
// }

// function patchFormValue(form: FormGroup | FormArray, newFormValue, _FORM) {
//   if (newFormValue instanceof Array) {
//     _checkFormArray(form as FormArray, newFormValue, _FORM[0]);
//     newFormValue.forEach((el, i) => _checkForm((form as FormArray).at(i) as FormGroup, el, _FORM[0]));
//   } else if (newFormValue instanceof Object) {
//     _checkForm((form as FormGroup), newFormValue, _FORM);
//   }
//   form.patchValue(newFormValue);
// }

// function _getForm(value, validators = [], disabled = false) {
//   if (value instanceof Map) {
//     return _getConfig(value);
//   } else if (value instanceof Array) {
//     return getFormArray(value['value'] || value, validators);
//   } else if (value instanceof Object) {
//     return getFormGroup(value.value || value, validators);
//   } else {
//     return new FormControl({ value, disabled }, validators);
//   }
// }

// function getForm(value) {
//   return _getForm(value);
// }

// function filterForms(formValue) {
//   const newFormValue: any = {};

//   for (const val in formValue) {
//     if (formValue[val] !== '' && formValue[val] !== null) {
//       if (formValue[val] instanceof Array) {
//         const newArray = formValue[val]
//           .map(el => el instanceof Object ? filterForms(el) : el)
//           .filter(el => el instanceof Object ? Object.keys(el).length : el);
//         if (newArray.length) {
//           newFormValue[val] = newArray;
//         }
//       } else if (formValue[val] instanceof Object) {
//         const newObj = filterForms(formValue[val]);
//         if (Object.keys(newObj).length) {
//           newFormValue[val] = newObj;
//         }
//       } else {
//         newFormValue[val] = formValue[val];
//       }
//     }
//   }
//   return newFormValue;
// }

// export { getForm, withConfig, patchFormValue, filterForms };
