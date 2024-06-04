import { Component, Input, OnDestroy } from "@angular/core";
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from "@angular/forms";
import { Subscription } from "rxjs";

/* 
  Re-useable form component (form that can be nested into existing form).
  Unlike custom forms, this one will delegate an existing.
*/
@Component({
  selector: "address-form",
  templateUrl: "./address-form.component.html",
  styleUrls: ["./address-form.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AddressFormComponent
    }
  ]
})

export class AddressFormComponent implements ControlValueAccessor, OnDestroy {
  @Input()
  legend: string;

  onTouched = () => {};

  // We want to track the manual subscription and destroy it to prevent memeory leaks.
  onChangeSub: Subscription;

  form: FormGroup = this.fb.group({
    addressLine1: [null, [Validators.required]],
    addressLine2: [null, [Validators.required]],
    zipCode: [null, [Validators.required]],
    city: [null, [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnDestroy(): void {
    this.onChangeSub.unsubscribe();
  }

  writeValue(value: any): void {
    // This expects all values to be present from the form
    if(value) {
      this.form.setValue(value);
    }
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  // Delegate state to form
  setDisabledState(disabled: boolean): void {
    if(disabled) {
      this.form.disable();
    }
    else {
      this.form.enable();
    }
  }

  // Report form value changes (only registers once)
  registerOnChange(onChange: any): void {
    this.onChangeSub = this.form.valueChanges.subscribe(value => onChange(value));
  }
}
