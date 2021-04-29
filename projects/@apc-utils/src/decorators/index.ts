// export const eventDecorator2 = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
//   const originalMethod = descriptor.value;
//   descriptor.value = function (event: MouseEvent, ...args: any[]) {
//     event.stopPropagation();
//     const result = originalMethod.apply(this, args);
//     return result;
//   };
// };

export function EventDecorator() {
  return function (target: any, key: string, descriptor: PropertyDescriptor): any {
    const originalMethod = descriptor.value;
    descriptor.value = function (event: MouseEvent, ...args: any[]) {
      event.stopPropagation();
      return originalMethod.apply(this, event, args);
    };
    return descriptor;
  };
};

// ovo je bio pokusaj da dekorisem kako ne bi pravio return new promise jer ruzno izgleda
// probaj da ga sredis
export function PromiseApc() {
  return function (target: any, key: string, descriptor: PropertyDescriptor): any {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]): Promise<string> {
      return new Promise((resolve, rej) => {
        const result = originalMethod.apply(this, args);
        resolve(result);
      });
    };
    return descriptor;
  };
}

export function ApcDefer(time = 0) {
  return function (target: any, key: string, descriptor: PropertyDescriptor): any {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      setTimeout(() => {
        return originalMethod.apply(this, args);
      }, time);
    };
    return descriptor;
  };
}

export function ApcDebounce(time = 300) {
  return function (target: any, key: string, descriptor: PropertyDescriptor): any {
    const originalMethod = descriptor.value;
    let timeout: any;
    descriptor.value = function (...args: any[]) {

      const start = () => {
        timeout = setTimeout(() => {
          originalMethod.apply(this, args);
        }, time);
      };

      if (timeout) {
        clearTimeout(timeout);
      }
      start();
    };
    return descriptor;
  };
}