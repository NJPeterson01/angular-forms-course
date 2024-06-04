import { FormGroup, ValidatorFn, Validators } from "@angular/forms";

/*
    This is a form level validator, not a formControl validator
*/
export function createPromoRangeValidator(): ValidatorFn {
    return (form: FormGroup): Validators | null => {

        const start: Date = form.get("promoStart").value;
        const end: Date = form.get("promoEnd").value;

        if(!start || !end) {
            return null;
        }

        const isRangeValid = (end?.getTime() - start?.getTime() > 0);

        // Any object can be returned here to define the error. Just returning a flag is easier.
        return isRangeValid ? null : {promoPeriod: true};
    }
}