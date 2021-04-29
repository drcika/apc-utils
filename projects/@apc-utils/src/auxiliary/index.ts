import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicKey } from '../models';

const idMap: DynamicKey<number> = {};

function check(id: number): number {
  if (!(id in idMap)) {
    idMap[id] = id;
    return id;
  }
  return check(id + 1);
}

export function generateId(): number {
  return check(new Date().getTime());
}

export function ApcDeepCopy(value: any) {
  return JSON.parse(JSON.stringify(value));
}

@Injectable()
export class HttpReqInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const _request = request.clone({
      withCredentials: true, headers: new HttpHeaders({
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        // Expires: 'Sat, 01 Jan 2000 00:00:00 GMT'
      })
    });
    return next.handle(_request);
  }
}


function encode(s) {
  var out = [];
  for (var i = 0; i < s.length; i++) {
    out[i] = s.charCodeAt(i);
  }
  return new Uint8Array(out);
}

export function apcDownload(_data, name) {

  // const data = encode(JSON.stringify(_data, null, 4));
  const data = encode(JSON.stringify(_data));

  var blob = new Blob([data], {
    type: 'application/octet-stream'
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', name + '.json');
  link.click();
  // var event = document.createEvent( 'MouseEvents' );
  // event.initMouseEvent( 'click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
  // link.dispatchEvent( event );
}