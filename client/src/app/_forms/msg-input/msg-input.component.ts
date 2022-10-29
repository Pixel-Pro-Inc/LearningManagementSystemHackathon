import { Component, Input, OnInit, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-msg-input',
  templateUrl: './msg-input.component.html',
  styleUrls: ['./msg-input.component.css'],
})
export class MsgInputComponent {
  @Input() label: string;
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() id = '';

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
}
