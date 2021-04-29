import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

// uzmi podeli po fajlovima za sada stoji ovako
// TODO i sredi sve ove any i as any sto me je strict bio forsirao
// ovde u apc lib
@Pipe({ name: 'apcDate' })
export class ApcDatePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) { }
  transform(date: Date | string, format: string = 'dd MMMM yyyy h:mma'): any {
    return date && this.datePipe.transform(date, format);
  }
}

@Pipe({ name: 'isActive' })
export class IsActivePipe implements PipeTransform {
  transform(object: any, onlyActive: boolean): any {
    if (!onlyActive) { return object; }
    if (object instanceof Array) {
      return object.filter(el => !('isInstanceRunning' in el) || el.isInstanceRunning);
    }
    const newObject: any = {};
    for (const key in object) {
      if (object[key].isInstanceRunning) {
        newObject[key] = object[key];
      }
    }
    return newObject;
  }
}

@Pipe({ name: 'apcValue' })
export class ApcValuePipe implements PipeTransform {
  transform(object: any): any {
    return object && Object.values(object) || [];
    // return object && Object.values(object).map(key => key) || [];
  }
}

@Pipe({ name: 'apcKey' })
export class ApckeyPipe implements PipeTransform {
  transform(object: any): any {
    return object && Object.keys(object) || [];
    // return object && Object.keys(object).map(key => key) || [];
  }
}

@Pipe({ name: 'apcFilter' })
export class ApcFilterPipe implements PipeTransform {
  transform(object: any): any {
    if (object instanceof Array) {
      return object.filter(Boolean);
    } else {
      return filter(object);
    }
  }
}

const filter = (obj: any) => {
  const newObj: any = {};

  for (const key in obj) {
    if (obj[key]) {
      if (obj[key] instanceof Object) {
        const o = filter(obj[key]);
        if (Object.values(o).length) {
          newObj[key] = obj[key];
        }
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  return newObj;
};

@Pipe({ name: 'typeof' })
export class TypeofPipe implements PipeTransform {

  transform(value: any): any {
    return typeof value;
  }

}

@Pipe({ name: 'filterObj' })
export class FilterObjPipe implements PipeTransform {

  transform(obj: any, { key, not = false, active }: { key: string, not: boolean, active: boolean; }): any {
    const filtered_list = Object.values(obj).filter((el: any) => {
      if (active != undefined) {
        if (not) {
          return !el[key] && el.active == active;
        } else {
          return el[key] && el.active == active;
        }
      } else {
        if (not) {
          return !el[key];
        } else {
          return el[key];
        }
      }
    });
    return filtered_list;
  }

}
