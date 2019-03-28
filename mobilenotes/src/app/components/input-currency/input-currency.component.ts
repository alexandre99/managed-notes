import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'input-currency',
  templateUrl: './input-currency.component.html',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputCurrencyComponent), multi: true }]
})
export class InputCurrencyComponent implements OnInit, ControlValueAccessor {

  @Input() placeHolder: string;
  private patternCurrency: string = '^((\\d{0,12}(?:\\,\\d{0,2}))|(\\d{0,12}))$';

  value: any;
  onChange: any;

  constructor() { }

  ngOnInit() {}

  change(event: any) {
    let value: string = event.target.value;
    let valueComparation = value.replace('.', ',');
    if (valueComparation && valueComparation.match(this.patternCurrency)) {
      this.value = value;
      this.onChange(this.value)
    } else {
      event.target.value = this.value;
    }
  }

  keyBoardEvent(event: any) {
    console.log(event.target.value);
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
  }


}
