import { trigger, transition, style, animate, state } from '@angular/animations';

export const animHeight = trigger('animHeight', [
  state('true', style({ height: '{{height}}', opacity: '{{opacity}}' }), { params: { height: '*', opacity: 1 } }),
  state('false', style({ height: '{{height}}', opacity: '{{opacity}}' }), { params: { height: '0px', opacity: 0 } }),

  transition('true => false', [animate('200ms ease-in')]),
  transition('false => true', [animate('200ms ease-in')]),
]);

export const slideToRight = trigger('slideToRight', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX({{x}})' }),
    animate('200ms', style({ opacity: 1, transform: 'translateX(0)' })),
  ], { params: { x: '-100%' } }),
  transition(':leave', [
    style({ opacity: 1, transform: 'translateX(0)' }),
    animate('200ms', style({ opacity: 0, transform: 'translateX({{x}})' })),
  ], { params: { x: '-100%' } })
]);

export const expand = trigger('expand', [
  transition(':enter', [
    style({ height: 0, overflow: 'hidden' }),
    animate('200ms', style({ height: '*' })),
    style({ overflow: 'visible' })
  ]),
  transition(':leave', [
    style({ height: '*', overflow: 'hidden' }),
    animate('200ms', style({ height: '0px' })),
    style({ overflow: 'visible' })
  ]),
]);

export const hAnim = trigger('hAnim', [
  transition(':enter', [
    style({ height: 0, opacity: 0, overflow: 'hidden' }),
    animate('200ms', style({ height: '*', opacity: 1 })),
    style({ overflow: 'visible' })
  ]),
  transition(':leave', [
    style({ height: '*', opacity: 1, overflow: 'hidden' }),
    animate('200ms', style({ height: '0px', opacity: 0 })),
    style({ overflow: 'visible' })
  ]),
]);

export const fade = trigger('fade', [
  transition(':enter', [style({ opacity: 0 }), animate(200, style({ opacity: 1 }))]),
  transition(':leave', [style({ opacity: 1 }), animate(200, style({ opacity: 0 }))])
]);

export const animSearch = trigger('animSearch', [
  transition(':enter', [
    style({ height: '40px', width: '600px', overflow: 'hidden' }),
    animate('200ms',
      style({ height: '*', width: '768px' })),
    style({ overflow: 'visible' }),
  ])
]);
