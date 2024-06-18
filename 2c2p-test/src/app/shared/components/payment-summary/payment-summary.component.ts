import { Component, Input } from '@angular/core';
import { IResponseResultPayment } from '../../models/res-payment';

@Component({
  selector: 'app-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.scss']
})
export class PaymentSummaryComponent {

  @Input() responseMessage: IResponseResultPayment;

  constructor() {
    this.responseMessage = {
      message: '',
      responseCode: '',
      invoiceNo: '',
    }
  }
}
