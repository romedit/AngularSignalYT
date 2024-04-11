import { ICategory } from './../../types/category.interface';
import { DbService } from 'src/app/services/db.service';
import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ITransaction } from 'src/app/types/transaction.interface';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss']
})
export class TransactionTableComponent implements OnInit {

  trashIcon = faTrash
  p: number = 1;

  constructor(protected dbService: DbService) {

  }

  ngOnInit(): void {
    this.dbService.findAllTransactions()
  }

  deleteTransaction(transaction: ITransaction) {
    this.dbService.deleteTransaction(transaction.id).subscribe()
  }

  findCategoryTitleById(category: ICategory | null): string {
    let categoryTitle = "[category is not existing]";
    if (typeof category === 'string') {
      const foundCategory = this.dbService.categoriesSig().find(elem => {
        return elem.id === category
      })?.category
      if (foundCategory)
        categoryTitle = foundCategory
    }
    return categoryTitle
  }

}
