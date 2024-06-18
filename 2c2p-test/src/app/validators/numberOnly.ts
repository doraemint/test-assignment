import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";
import { REG_EXP } from "../shared/constants/regex";

/** 
 * Field allows only number 0-9 only.
 * If validation fail will throws `numberOnly` key
 * @return {(object|null)} return null if validateion is valid, otherwise return object
 */
export function numberOnly(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const valid = control.value ? REG_EXP.ALLOW.NUMNER_ONLY.test(control.value) : true;
        return !valid ? { numberOnly: { value: control.value } } : null;
    };
}