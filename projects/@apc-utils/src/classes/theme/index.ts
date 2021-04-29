export class ApcTheme {

  constructor(theme: string) {
    this._theme = theme ? theme :
      matchMedia && matchMedia('(prefers-color-scheme: light)')?.matches ? 'light' : 'dark';
    this._theme === 'light' && this.toggleTheme();
  }

  private _theme: string; // tmp

  get theme() { return this._theme; }

  set theme(theme) {
    this._theme = theme;
    this.toggleTheme();
  }

  toggleTheme() {
    if ('document' in globalThis) {
      document?.body.classList.toggle('light-theme');
    }
  }

  reset() {
    // document?.body.classList.remove('light-theme');
  }
}
