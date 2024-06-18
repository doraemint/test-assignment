import { AbstractControl, ValidationErrors } from '@angular/forms';

export function cardNumberValidator(control: AbstractControl): ValidationErrors | null {
  const cardNumber = control.value;
  const isValid = /^\d{15,16}$/.test(cardNumber) && (cardNumber.length === 16 || (cardNumber.length === 15 && isAmex(cardNumber)));
  return isValid ? null : { invalidCardNumber: true };
}

function isAmex(cardNumber: string): boolean {
  // Assuming Amex card numbers start with 34 or 37
  return /^3[47]/.test(cardNumber);
}

export function expiryValidator(control: AbstractControl): ValidationErrors | null {
  const expiry = control.value;
  const isValid = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiry);
  return isValid ? null : { invalidExpiry: true };
}

export function nameValidator(control: AbstractControl): ValidationErrors | null {
  const name = control.value;
  const isValid = /^[a-zA-Z\s]*$/.test(name);
  return isValid ? null : { invalidName: true };
}

export function emailValidator(control: AbstractControl): ValidationErrors | null {
  const email = control.value;
  if (!email) return null; // Email is optional
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return isValid ? null : { invalidEmail: true };
}
