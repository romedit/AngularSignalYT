import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DbService } from 'src/app/services/db.service';
import { ICategory } from 'src/app/types/category.interface';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent {
  form: FormGroup
  constructor(protected dbService: DbService) {
    this.form = new FormGroup({
      title: new FormControl("", [Validators.required]),
      amount: new FormControl("", [Validators.required, Validators.min(0)]),
      category: new FormControl("", [Validators.required]),
      type: new FormControl("", [Validators.required])
    });
  }

  submitForm() {
    if (this.form.valid) {
      this.dbService.createTransaction(this.form.value).subscribe()
    }
  }
}
