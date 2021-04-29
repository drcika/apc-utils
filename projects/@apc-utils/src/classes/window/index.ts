import { DynamicKey } from '../../models';

export class ApcWindow {

  instances: DynamicKey<Window | null> = {};

  get instance() {
    return (id: number) => this.instances[id];
  }

  // TODO hendluj kada se zatvori prozor na x
  open(id: number, url?: string, target?: string, features?: string, replace?: boolean): Window {
    const instance = window.open(url, target, features, replace) as Window;
    if (instance) {
      this.instances[id] = instance;
      this.attachClassName(instance);
    }
    return instance;
  }

  attachClassName(instance: Window) {
    const classList = document.body.classList.toString();
    // classList && instance.addEventListener('load', () => {
    //   instance.document.body.classList.add(classList);
    // });
    classList && (instance.onload = () => {
      instance.document.body.classList.add(classList);
    });
  }

  changeTheme(theme: string) {
    for (const id in this.instances) {
      if (this.instances[id]) {
        this.instances[id]?.document.body.classList.toggle(theme);
      }
    }
  }

  destroy(id: number) {
    if (id in this.instances && !this.instances[id]?.closed) {
      // this.instances[id].opener = null; // ovo je pokusaj da mi brze vraca u app
      this.instances[id]?.close();
      this.instances[id] = null;
      delete this.instances[id];
    }
  }

  destroyAll() {
    for (const id in this.instances) {
      this.instances[id]?.close();
    }
  }

}
