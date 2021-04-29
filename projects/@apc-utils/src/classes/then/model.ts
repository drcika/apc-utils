export type Hendler = (...args: any) => any;
export type ArgList = [AdeThen, Hendler];

export class ApcSubject {
  constructor(public id: number, public hendler: Hendler) { }
}

// 'action' stiglo od websoketa 
// 'entries-emiter' je sada observable
// 'instance-close' | 'instance-new' |
// export type AdeThen = 'spinner' | 'action' | 'open-connection' | 'error' | 'closed-connection' | 'logged' | 'open-form' |
//   'entries-update' | 'entries-map' | 'entries-init' | 'entries-live' | 'graphs-map' | 'graphs-edit' |
//   'open-panel' | 'facilityList';

export type AdeThen = 'facilityList' | 'graphs-map' | 'open-form' | 'open-panel' | 'error';