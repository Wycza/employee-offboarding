import { FormControl } from '@angular/forms';

export function getControlError(control: FormControl): string | null {
  if (control.invalid && (control.dirty || control.touched)) {
    if (control.errors?.['required']) {
      return 'This field is required.';
    }

    if (control.errors?.['email']) {
      return 'Incorrect email.';
    }

    if (control.errors?.['pattern']) {
      return 'Incorrect value.';
    }
  }

  return null;
}
