import { Component, OnInit } from '@angular/core';
import { IPaymentDetail } from 'src/app/shared/models/mock-payment-detail';
import { PaymentService } from 'src/app/service/payment.service';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.scss']
})
export class PaymentDetailComponent implements OnInit {
  paymentDetail!: IPaymentDetail;

  constructor(private paymentService: PaymentService) {
  }

  ngOnInit(): void {
    this.getPaymentDetail();
  }

  getPaymentDetail() {
    this.paymentService.getMockPaymentDetail().subscribe((data) => {
      this.paymentDetail = data;
    });
  }
}
