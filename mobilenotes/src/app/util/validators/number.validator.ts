import { FormControl, ValidationErrors } from "@angular/forms";

export class NumberValidator {

    static validGtZero(fc: FormControl): ValidationErrors | null {
        try {
            let value = parseFloat(fc.value);
            if (value > 0) {
                return ({ validGtZero: true })
            }
        } catch (error) {

        }
        return (null);
    }
}