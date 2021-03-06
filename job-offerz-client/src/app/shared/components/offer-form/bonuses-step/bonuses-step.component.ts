import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray} from "@angular/forms";
import {OfferFormConsts} from "../../../../utils/offer-form-consts";
import {FormUtils} from "../../../../utils/form-utils";
import {SnackBarService} from "../../../services/snack-bar.service";
import {Bonus} from "../../../../models/bonus";

@Component({
  selector: 'app-bonuses-step',
  templateUrl: './bonuses-step.component.html',
  styleUrls: ['./bonuses-step.component.scss']
})
export class BonusesStepComponent implements OnInit {

  @Input('formGroup')
  formGroup: FormGroup;

  @Input()
  bonusesToEdit: Bonus[];

  formArray: FormArray;

  descMaxLength = OfferFormConsts.MAX_BONUS_DESC_LENGTH;
  checkInputLength = FormUtils.checkInputLength;

  constructor(private formBuilder: FormBuilder,
              private snackBarService: SnackBarService) { }

  ngOnInit() {
    this.formArray = this.getArrayControl();
    if (this.bonusesToEdit) {
      this.bonusesToEdit.forEach(bonus => {
        this.addBonus(bonus.description);
      });
    }
  }

  addBonus(description?: string) {
    if (this.formArray.length < OfferFormConsts.MAX_BONUS_ITEMS) {
      this.formArray.push(
        this.formBuilder.group({
          description: [description || '', Validators.compose([Validators.required, Validators.maxLength(OfferFormConsts.MAX_BONUS_DESC_LENGTH)])]
        })
      );
    } else {
      this.snackBarService.error(`Maksymalna liczba dodatków to ${OfferFormConsts.MAX_BONUS_ITEMS}`);
    }
  }

  removeBonus(index: number) {
    this.formArray.removeAt(index);
  }

  private getArrayControl(): FormArray {
    return <FormArray>this.formGroup.controls['bonuses'];
  }

}
