/**
 * @description abstraction over Promise, for later use
 * @returns Promise it self, resolver and rejector
 * @publicApi
 * @example
 * ```
 * promise = new ApcPromise()
 * // later
 * promise.resolve(...args)
 * ```
 */
export class ApcPromise {
  promise: Promise<any>;
  resolve!: (value: any) => void;
  reject!: (reason?: any) => void;

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.reject = reject;
      this.resolve = resolve;
    });
  }
}