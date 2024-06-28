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
  countryData: any = [];

  constructor(private fb: FormBuilder, private paymentService: PaymentService) {
    this.form = this.fb.group({
      cardSchemeId: ["", Validators.required],
      cardNumber: ["", [Validators.required, Validators.minLength(15), Validators.maxLength(16), cardNumberValidator]],
      expiry: ["", [Validators.required, expiryValidator]],
      name: ["", [Validators.required, Validators.maxLength(30), nameValidator]],
      email: ["", [Validators.maxLength(50), emailValidator]],
      country: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.getCardScheme();
    this.loadCountryData();
  }

  getCardScheme() {
    const cachedCardSchemesdata = localStorage.getItem('cardSchemes');
    if (cachedCardSchemesdata) {
      this.cardSchemes = JSON.parse(cachedCardSchemesdata);
    } else {
      this.paymentService.getCardSchemes().pipe(
        map((data: CardSchemes) => {
          const listCardSchemes = Object.values(ListCardSchemes).map(list => list.toLowerCase());
          return data.filter(allCardScheme => listCardSchemes.includes(allCardScheme.name.toLowerCase()));
        })
      )
        .subscribe((filteredCardSchemes) => {
          this.cardSchemes = filteredCardSchemes;

          localStorage.setItem('cardSchemes', JSON.stringify(this.cardSchemes));
        });
    }
  }

  loadCountryData() {
    const cachedCountryData = localStorage.getItem('countryData');
    if (cachedCountryData) {
      this.countryData = JSON.parse(cachedCountryData);
    } else {
      this.getCountry();
    }
  }

  getCountry() {
    this.paymentService.getCountry().subscribe((data) => {
      const allData = data;
      this.countryData = allData.map((data: any) => {
        return data.name.official;
      });

      localStorage.setItem('countryData', JSON.stringify(this.countryData));
    });
  }

  changeSelectCardSchemes() {
    const selectedCardScheme = this.cardSchemes.find(
      scheme => scheme.id.toString() === this.form.value.cardSchemeId
    );
    this.cardNumberMaxLength = selectedCardScheme?.name.toLowerCase() === ListCardSchemes.AMEX.toLowerCase() ? 15 : 16;
  }

  customSearchFn(text: string, item: any) {
    if (text.length < 2) { return item; };

    text = text.toLowerCase();
    return item.toLowerCase().includes(text);
  }
}
