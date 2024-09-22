import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTogglePassword]',
  exportAs: 'appTogglePassword'
})
export class TogglePasswordDirective {
  private _isPasswordVisible: boolean = false;
  
  get isPasswordVisible(): boolean {
    return this._isPasswordVisible;
  }

  toggle(): void {
    this._isPasswordVisible = !this._isPasswordVisible;
  }
}
