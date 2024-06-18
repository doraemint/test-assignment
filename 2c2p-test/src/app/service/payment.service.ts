import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CardSchemes } from '../shared/models/card-schemes';
import { Observable, of } from 'rxjs';
import { mockPaymentDetail } from '../shared/models/mock-payment-detail';
import { IResponseResultPayment } from '../shared/models/res-payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  urlGetCardScehemes = 'https://uat3ds.2c2p.com/emv3ds/mockservice/masterdata/cardschemes';
  urlSubmitPayment = 'https://uat3ds.2c2p.com/emv3ds/mockservice/payment';

  constructor(private http: HttpClient) {
  }

  getMockPaymentDetail() {
    return of(mockPaymentDetail);
  }

  getCardSchemes(): Observable<CardSchemes> {
    return this.http.get<CardSchemes>(this.urlGetCardScehemes);
  }

  submitPayment(paymentData: any): Observable<IResponseResultPayment> {
    return this.http.post<IResponseResultPayment>(this.urlSubmitPayment, paymentData);
  }

}
