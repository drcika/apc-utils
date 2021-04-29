import { DynamicKey } from '../../models';
import { generateId } from '../../auxiliary';
import { AdeThen, ApcSubject, ArgList, Hendler } from './model';

/**
 * @description * Base class for indexedDB storage.
 * @todo // TODO dodati bkp ako nema indexeddb
 * @publicApi
 */
export class ApcThen {

  constructor(list: ArgList[] = []) {
    this.subcribe(list); // () => {} da ne smara strict
  }

  private _then: DynamicKey<DynamicKey<ApcSubject>> = {};
  private _latest: DynamicKey<any> = {};

  subcribe(arr: AdeThen | ArgList[], hendler?: Hendler) {
    // nekako da proveravam i brisem reference mozda me to jebe za external prozorima
    // TODO mozda bi mogla provera da li hendler postoji
    // jer je sada default null da bi moglo da bude lista kako ne bi imao tonu linija u kodu
    arr instanceof Array ?
      arr.forEach(el => this._subcribe(el[0], el[1])) :
      this._subcribe(arr, hendler as Hendler);
  }

  _subcribe(type: AdeThen, hendler: Hendler) {
    if (!this._then[type]) { this._then[type] = {}; }
    const id = generateId();

    const apcSubject = new ApcSubject(id, hendler);

    this._then[type][id] = apcSubject;
    (type in this._latest) && this._call(type, this._latest[type]);
    return apcSubject; // za sada ne treba
  }

  _call(_type: AdeThen, _arg: any = null) {
    this._latest[_type] = _arg;
    if (this._then[_type]) {
      for (const id in this._then[_type]) {
        // TODO nekako provera da li postoji referenca
        this._then[_type][id]?.hendler(_arg);
      }
    }
  }

  emit(_type: AdeThen | Array<[AdeThen, any]>, _arg: any = null) {
    _type instanceof Array ?
      _type.forEach(([t, a]) => this._call(t, a)) :
      this._call(_type, _arg);
  }

}
