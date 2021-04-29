/**
 * @description * Base class for indexedDB storage.
 * @todo // TODO dodati bkp ako nema indexeddb
 * @publicApi
 */
export class ApcStorage {

  /**
   * @description Opening db connections
   * @private
   * @param table DB name
   * @param version DB versio 
   * @returns connections to DB
   */
  private _openDB(table: string, version: number): IDBOpenDBRequest {
    return indexedDB.open(table, version);
  }

  /**
   * @description return data from indexeddb storage
   * @param  table - DB name
   * @param  type - DB type 'map' | 'list'
   * @param  version - DB version, { @default = 1 }
   * @todo omit DBTableType try figuring oute in code in theth case must return undefined
   * @returns Promise<DB> 
   * @usageNotes
   * ``` typescript
   * storage = new ApcStorage()
   * storage.get('users', 'map')
   * ```
   */
  get(table: string, version = 1): Promise<any | Array<any>> {
    return new Promise((resolve, reject) => {
      const request = this._openDB(table, version);

      request.onerror = (event: Event) => { console.log('error:', event); reject(event); };

      /**
       * @summary create ne DB if no exist
       */
      request.onupgradeneeded = () => {
        request.result.createObjectStore(table);
      };

      /** 
       * @summary obtain value vrom DB
       */

      request.onsuccess = _ => {
        let map: boolean;

        let _data: any;
        request.result.transaction([table], 'readonly').objectStore(table)
          .openCursor().onsuccess = (event) => {
            const cursor = (event.target as any).result;
            if (cursor) {
              /**
               * @summary utvrdjujem da li je kolekcija Array ili Object
               *          nema problema, testirao jer ako je obj 0 je string a ako je array 0 je number
               */
              map === undefined && (map = cursor.key !== 0);
              !_data && (_data = map ? {} : []);
              map ? _data[cursor.key] = cursor.value : _data.push(cursor.value);
              cursor.continue();
            } else {
              resolve(_data);
            }
          };
      };
    });
  }


  /**
   * @description save data to indexeddb storage
   * @param  table - DB name
   * @param  version - DB version, { @default = 1 }
   * @usageNotes
   * ``` typescript
   * storage = new ApcStorage()
   * storage.set('users', users)
   * ```
   */
  set(table: string, data: any, version = 1) {
    const request = this._openDB(table, version);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(table);
    };
    request.onsuccess = () => (
      data instanceof Array ?
        this._put(request.result, table, data) :
        this._add(request.result, table, data)
    );
  }

  /**
   * @private
   * @description save data into indexed DB storage
   * @note case when data is a Array
   */
  private _put(db: IDBDatabase, database: string, data: Array<any>) {
    const objectStore = db.transaction([database], 'readwrite').objectStore(database);
    objectStore.clear();

    data.forEach((el, i) => objectStore.put(el, i));
  }

  /**
   * @private
   * @description save data into indexed DB storage
   * @note case when data is a Object
   */
  private _add(db: IDBDatabase, database: string, data: any) {
    const objectStore = db.transaction([database], 'readwrite').objectStore(database);

    for (const key in data) {
      objectStore.put(data[key], key);
    }
  }

  /**
 * @description delete db from indexeddb storage
 * @param  table - DB name
 * @returns Promise<Event>
 * @usageNotes
 * ``` typescript
 * storage = new ApcStorage()
 * storage.delete('users')
    .then(evt => console.log(evt))
    .catch(err => console.log(err))
 * ```
 */
  delete(table: string) {
    return new Promise((resolve, reject) => {
      const DBDeleteRequest = indexedDB.deleteDatabase(table);

      DBDeleteRequest.onerror = function(event) {
        reject(reject);
      };

      DBDeleteRequest.onsuccess = function(event: Event) {
        resolve(event);
      };
    });
  }
}
