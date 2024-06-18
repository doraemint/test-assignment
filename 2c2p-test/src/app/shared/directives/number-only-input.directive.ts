import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from "@angular/core";

@Directive({
  selector: "[numberOnly]",
})
export class NumberOnlyInputDirective {
  constructor(private _el: ElementRef) {}

  @HostListener("input", ["$event"]) onInputChange(event: KeyboardEvent) {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, "");
    if (initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
