import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { createPasswordStrengthValidator } from "../validators/password-strength.validator";

@Component({
  selector: "login-reactive",
  templateUrl: "./login-reactive.component.html",
  styleUrls: ["./login-reactive.component.css"],
})
export class LoginReactiveComponent implements OnInit {
  /*
  email = new FormControl('', {validators: [Validators.required, Validators.email]});
  password = new FormControl('', {validators: [Validators.required, Validators.minLength(8)]});

  // Outside method (manual form creation with controls outside of form)
  form: FormGroup = new FormGroup ({
    email: this.email,
    password: this.password
  });
  */

  // Inside method (manual form creation from inside form)
  /*
    Update on triggers when the formControl should update its parent form.

    You don't need custom directives to use validators in reactive style. Simply
    pass the formControl the validator factory.
  */
  /*
  form: FormGroup = new FormGroup({
    email: new FormControl("", {
      validators: [Validators.required, Validators.email],
      updateOn: "blur",
    }),
    password: new FormControl("", {
      validators: [Validators.required, Validators.minLength(8), createPasswordStrengthValidator()],
    }),
  });
  */

  // Form Builder Service method (automatically creates form controls with given names, initial value, and validators)
  /* 
    Allows easier creation of additional forms after creation via "fb.control('', {})".
    Although this is not strictly typed, Angular can infer its type dynamically. There is no need to strictly declare it as FormGroup.
    By default, if you set a formControl to '', it will be a nullable string (string | null)
  */
  form = this.fb.group({
    /*
    // Non-Nullable version of form control (reset value will be initial value)
    email: this.fb.nonNullable.control("", {
       validators: [Validators.required, Validators.email], 
        updateOn: "blur"
    })
    */
    email: [
      "",
      { validators: [Validators.required, Validators.email], 
        updateOn: "blur" },
    ],
    password: [
      "",
      [
        Validators.required,
        Validators.minLength(8),
        createPasswordStrengthValidator(),
      ],
    ],
  });

  // There is a service called NonNullableFormBuilder that instantiates all form controls as 'nonNullable'.
  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  /*
    Bad practice to put very verbose statements in the HTML. Instead of calling
    form.controls['email'].errors... create a getter method.
  */
  get email() {
    return this.form.controls['email'];
  }

  get password() {
    return this.form.controls['password'];
  }

  reset() {
    this.form.reset();
    console.log(this.form.value);
  }
}
