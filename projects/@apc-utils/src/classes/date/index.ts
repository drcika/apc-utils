import { formatDate } from '@angular/common';

export const getMili = (time: string): number => { // 00:00:00
  const [h, m, s] = time.split(':');

  const sec = +s * 1000;
  const min = +m * 60 * 1000;
  const hour = +h * 60 * 60 * 1000;

  return (hour + min + sec);
};

export class ApcDate extends Date {

  constructor(template: any = null, type: string = '') {
    if (template) {
      if (type === 'YYYYMMDD') {
        const value = template.toString();
        super(value.slice(0, 4), +value.slice(4, 6) - 1, value.slice(6, 8));
      } else {
        super(template);
      }
    } else {
      super();
    }
  }

  format({ format = 'dd MMMM yyyy h:mm:ss.sss a', locale = 'en-GB', suffix = false } = {}) {
    if (suffix) {
      const date = formatDate(this, format, locale);
      const dateSufix = this._getSufix(date.slice(0, 2));
      return this._splice(date, 2, 0, dateSufix);
    }
    else {
      return formatDate(this, format, locale);
    }
  }

  add(type: string, months = 1) {
    const [Y, M, D] = this.getApcDate();
    if (type === 'Y') { this.setFullYear(Y + months); }
    else if (type === 'M') { this.setMonth(M + months); }
    else if (type === 'D') { this.setDate(D + months); }
    return this;
  }

  subtract(type: 'Y' | 'M' | 'D', months = 1) {
    const [Y, M, D] = this.getApcDate();
    if (type === 'Y') { this.setFullYear(Y - months); }
    else if (type === 'M') { this.setMonth(M - months); }
    else if (type === 'D') { this.setDate(D - months); }
    return this;
  }

  getApcTime() {
    const H = this.getHours();
    const M = this.getMinutes();
    const S = this.getSeconds();
    if (H == new Date().getHours() && M == new Date().getMinutes()) {
      return '00:00:00';
    }
    return `${this._checkTime(H)}:${this._checkTime(M)}:${this._checkTime(S)}`;
  }

  getApcDate(): Array<number> {
    return [this.getFullYear(), this.getMonth(), this.getDate()];
  }

  private _checkTime(_t: number): string {
    const t = _t.toString();
    return t.length === 1 ? `0${t}` : t;
  }

  private _splice(string: string, index: number, count: number, add = '') {
    if (index < 0) {
      index += string.length;
      if (index < 0) {
        index = 0;
      }
    }
    return string.slice(0, index) + add + string.slice(index + count);
  }

  private _getSufix(d: any) {
    switch (+d) {
      case 1:
      case 21:
      case 31:
        return 'st';
      case 2:
      case 22:
        return 'nd';
      case 3:
      case 23:
        return 'rd';
      default:
        return 'th';
    }
  }

  validate() {
    return this < new ApcDate().add('M');
  }

}
