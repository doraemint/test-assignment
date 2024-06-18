import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[expiryDateInput]'
})
export class ExpiryDateInputDirective {

  constructor(private _el: ElementRef) { }

  @HostListener("input", ["$event"]) onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let initalValue = input.value;
    
    // Remove all non-numeric characters except the slash
    initalValue = initalValue.replace(/[^0-9\/]/g, '');

    // Add the slash separator if it's not already present after the month
    if (initalValue.length > 2 && initalValue.indexOf('/') === -1) {
      initalValue = `${initalValue.slice(0, 2)}/${initalValue.slice(2)}`;
    }

    // Limit to MM/YY format
    if (initalValue.length > 5) {
      initalValue = initalValue.slice(0, 5);
    }

    input.value = initalValue;

    // Stop the event propagation if the value has been modified
    if (input.value !== initalValue) {
      event.stopPropagation();
    }
  }
}
