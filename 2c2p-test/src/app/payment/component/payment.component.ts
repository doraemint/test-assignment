import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PaymentService } from 'src/app/service/payment.service';
import { PaymentFormComponent } from 'src/app/shared/components/payment-form/payment-form.component';
import { IResponseResultPayment } from 'src/app/shared/models/res-payment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements AfterViewInit {
  paymentForm: FormGroup;
  resultResponse!: IResponseResultPayment;

  isDisplayForm = true;

  @ViewChild("paymentFormRef")
  paymentFormComponent!: PaymentFormComponent;

  constructor(private paymentService: PaymentService, private fb: FormBuilder) {
    this.paymentForm = this.fb.group({});
  }

  ngAfterViewInit(): void {
    this.paymentForm.addControl(
      "paymentDetail",
      this.paymentFormComponent.form,
    );
  }

  get paymentDetailForm(): FormGroup {
    return this.paymentForm.get("paymentDetail") as FormGroup;
  }

  submit() {
    this.isDisplayForm = false;
    const paymentPayload = this.paymentDetailForm.value;

    this.paymentService.submitPayment(paymentPayload).subscribe({
      next: (v) => this.resultResponse = v,
      error: (e) => this.resultResponse = e.error,
    });

  }
}
