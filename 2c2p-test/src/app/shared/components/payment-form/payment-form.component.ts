import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/service/payment.service';
import { CardSchemes, ListCardSchemes } from 'src/app/shared/models/card-schemes';
import { map } from 'rxjs';
import { cardNumberValidator, emailValidator, nameValidator, expiryValidator } from 'src/app/validators/customValidators';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
})
export class PaymentFormComponent implements OnInit {
  form: FormGroup;
  cardSchemes: CardSchemes = [];

  cardNumberMaxLength: number = 16;

  constructor(private fb: FormBuilder, private paymentService: PaymentService) {
    this.form = this.fb.group({
      cardSchemeId: ["", Validators.required],
      cardNumber: ["", [Validators.required, Validators.minLength(15), Validators.maxLength(16), cardNumberValidator]],
      expiry: ["", [Validators.required, expiryValidator]],
      name: ["", [Validators.required, Validators.maxLength(30), nameValidator]],
      email: ["", [Validators.maxLength(50), emailValidator]]
    });
  }

  ngOnInit(): void {
    this.getCardScheme();
  }

  getCardScheme() {
    this.paymentService.getCardSchemes().pipe(
      map((data: CardSchemes) => {
        const listCardSchemes = Object.values(ListCardSchemes).map(list => list.toLowerCase());
        return data.filter(allCardScheme => listCardSchemes.includes(allCardScheme.name.toLowerCase()));
      })
    )
      .subscribe((filteredCardSchemes) => {
        this.cardSchemes = filteredCardSchemes;
      });
  }

  changeSelectCardSchemes() {
    const selectedCardScheme = this.cardSchemes.find(
      scheme => scheme.id.toString() === this.form.value.cardSchemeId
    );
    this.cardNumberMaxLength = selectedCardScheme?.name.toLowerCase() === ListCardSchemes.AMEX.toLowerCase() ? 15 : 16;
  }
}
