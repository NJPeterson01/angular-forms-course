import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/*
    Factory function that returns a function
*/
export function createPasswordStrengthValidator(): ValidatorFn {
    // Actual validator
    // Takes an HTML control as input and returns validation errors or null
    return (control: AbstractControl): ValidationErrors | null => {
        
        const value = control.value;

        if(!value) {
            return null;
        }

        // Regex to check uppercase
        const hasUpperCase = /[A-Z]+/.test(value);

        const hasLowerCase = /[a-z]+/.test(value);

        const hasNumeric = /[0-9]+/.test(value);

        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

        // Inline if-else
        return !passwordValid ? {passwordStrength: true}: null;
    }
}