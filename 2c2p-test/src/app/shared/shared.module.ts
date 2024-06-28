import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentSummaryComponent } from './components/payment-summary/payment-summary.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { PaymentDetailComponent } from './components/payment-detail/payment-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberOnlyInputDirective } from './directives/number-only-input.directive';
import { AlphabetSpaceInputDirective } from './directives/alphabet-space-input.directive';
import { ExpiryDateInputDirective } from './directives/expiry-date-input.directive';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    PaymentDetailComponent,
    PaymentFormComponent,
    PaymentSummaryComponent,
    NumberOnlyInputDirective,
    AlphabetSpaceInputDirective,
    ExpiryDateInputDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule

  ],
  exports: [
    PaymentDetailComponent,
    PaymentFormComponent,
    PaymentSummaryComponent
  ]
})
export class SharedModule { }
