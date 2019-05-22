import { FormControl, ValidationErrors } from "@angular/forms";
import { NumberUtils } from "../numberUtils";

export class NumberValidator {

    static validGtZero(fc: FormControl) {
        let value = NumberUtils.parseNumber(fc.value);
        return !NumberUtils.valueGtZero(value) ? ({ validGtZero: true }) : (null);
    }
}