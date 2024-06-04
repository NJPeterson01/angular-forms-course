import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { createPromoRangeValidator } from '../../validators/date-range.validator';


@Component({
  selector: 'create-course-step-2',
  templateUrl: 'create-course-step-2.component.html',
  styleUrls: ['create-course-step-2.component.scss']
})
export class CreateCourseStep2Component implements OnInit {

  // Form contains a custom Form Level validator 'createPromoRangeValidator()'
  form = this.fb.group({
    courseType: ['premium', Validators.required],
    price: [null, [Validators.required, Validators.min(1), Validators.max(999999), Validators.pattern("[0-9]+")]],
    thumbnail: [null],
    promoStart: [null],
    promoEnd: [null]
  },{
    validators: [createPromoRangeValidator()],
    //updateOn: 'blur'// Update on blur helps prevent errors from showing up too early by only updating when clicks away [May cause issues with custom forms]
  });

  constructor(private fb: FormBuilder){}

  ngOnInit() {
    // Emits value whenever a value changes in form
    this.form.valueChanges.subscribe(val => {
      const priceControl = this.form.controls["price"];

      if(val.courseType == 'free' && priceControl.enabled) {
        // Adding emitEvent prevents an infinite loop from the value changes observable
        priceControl.disable({emitEvent: false});
      } else if (val.courseType == 'premiun' && priceControl.disabled) {
        priceControl.enable({emitEvent: false});
      }
    });
  }

}
