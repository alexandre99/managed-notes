import { FormControl, ValidationErrors } from "@angular/forms";
import { NumberUtils } from "../numberUtils";

export class NumberValidator {

    static validGtZero(fc: FormControl) {
        return !NumberUtils.valueGtZero(fc.value) ? ({ validGtZero: true }) : (null);
    }
}