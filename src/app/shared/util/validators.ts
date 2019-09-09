import { AbstractControl, FormGroup } from '@angular/forms';

export function confirmPasswordValidator(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
        const passwordInput = group.controls[passwordKey],
            passwordConfirmationInput = group.controls[passwordConfirmationKey];
        if (passwordInput.value !== passwordConfirmationInput.value) {
            return passwordConfirmationInput.setErrors({ notEquivalent: true });
        } else {
            return passwordConfirmationInput.setErrors(null);
        }
    };
}
