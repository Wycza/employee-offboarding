import { FormControl, Validators } from '@angular/forms';
import { getControlError } from './forms.utils';

describe('getControlError', () => {
  it('should return null if control is valid and not touched or dirty', () => {
    // Arrange
    const control = new FormControl('valid');

    // Act
    const result = getControlError(control);

    // Assert
    expect(result).toBeNull();
  });

  it('should return null if control is invalid but not touched or dirty', () => {
    // Arrange
    const control = new FormControl('', [Validators.required]);

    // Act
    const result = getControlError(control);

    // Assert
    expect(result).toBeNull();
  });

  it('should return required error if control is touched and required', () => {
    // Arrange
    const control = new FormControl('', [Validators.required]);
    control.markAsTouched();

    // Act
    const result = getControlError(control);

    // Assert
    expect(result).toBe('This field is required.');
  });

  it('should return required error if control is dirty and required', () => {
    // Arrange
    const control = new FormControl('', [Validators.required]);
    control.markAsDirty();

    // Act
    const result = getControlError(control);

    // Assert
    expect(result).toBe('This field is required.');
  });

  it('should return email error if control is touched and has email error', () => {
    // Arrange
    const control = new FormControl('not-an-email', [Validators.email]);
    control.markAsTouched();

    // Act
    const result = getControlError(control);

    // Assert
    expect(result).toBe('Incorrect email.');
  });

  it('should return null if control is invalid but not dirty or touched (email)', () => {
    // Arrange
    const control = new FormControl('invalid', [Validators.email]);

    // Act
    const result = getControlError(control);

    // Assert
    expect(result).toBeNull();
  });
});
