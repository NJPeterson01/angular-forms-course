import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { createPasswordStrengthValidator } from "../validators/password-strength.validator";

/*
    Directives are how you run custom logic in the HTML. Adding this to an HTML
    object is no different than using 'required', 'maxlength', ..etc. In our case,
    this will be a validator. Directives must be registered in app.module directives.
*/

// if multi is not true, all other validators will not work
@Directive({
    selector: "[passwordStrength]",
    providers: [{
        provide: NG_VALIDATORS, 
        useExisting: PasswordStrengthDirective,
        multi: true
    }]
})
export class PasswordStrengthDirective implements Validator {

    validate(control: AbstractControl): ValidationErrors | null {
        // Calls factory function and internal validation function with value
        return createPasswordStrengthValidator()(control);
    }
}