import { ICategory } from './../types/category.interface';
import { ITransaction } from 'src/app/types/transaction.interface';
import { apiUrl } from './../constants/constants';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';


@Injectable({
    providedIn: "root"
})
export class DbService {
    categoriesSig = signal<ICategory[]>([])
    transactionsSig = signal<ITransaction[]>([])

    constructor(private readonly HttpClient: HttpClient, private readonly toastr: ToastrService) {
    }

    findAllCategories() {
        this.HttpClient.get<ICategory[]>(`${apiUrl}/categories`).subscribe(data => {
            this.categoriesSig.set(data)
        })
    }

    findAllTransactions() {
        this.HttpClient.get<ITransaction[]>(`${apiUrl}/transactions`).subscribe(data => {
            this.transactionsSig.set(data)
        })
    }

    createCategory(category: string) {
        return this.HttpClient.post(`${apiUrl}/categories`, { category: category }).pipe(tap(() => {
            this.toastr.success("Category was created")
            this.findAllCategories()
        }),
            catchError(ex => {
                this.toastr.error(ex.message)
                throw new Error(ex.message)
            }))
    }

    createTransaction(transaction: ITransaction) {
        return this.HttpClient.post(`${apiUrl}/transactions`, transaction).pipe(tap(() => {
            this.toastr.success("Transaction was added");
            this.findAllTransactions();
        }), catchError(err => {
            this.toastr.error(err.message)
            throw new Error(err.message)
        }))
    }

    updateCategory(categoryId: string, data: Object) {
        return this.HttpClient.patch(`${apiUrl}/categories/${categoryId}`, data).pipe(
            tap(() => {
                this.toastr.info("Category was updated")
                this.findAllCategories()
            }),
            catchError(ex => {
                this.toastr.error(ex.message)
                throw new Error(ex.message)
            })
        )
    }

    deleteCategory(categoryId: string) {
        return this.HttpClient.delete(`${apiUrl}/categories/${categoryId}`).pipe(
            tap(() => {
                this.toastr.info("Category was deleted")
                this.findAllCategories()
            }),
            catchError(ex => {
                this.toastr.error(ex.message)
                throw new Error(ex.message)
            }))
    }

    deleteTransaction(transactionId: string) {
        return this.HttpClient.delete(`${apiUrl}/transactions/${transactionId}`).pipe(
            tap(() => {
                this.toastr.info("Transaction was deleted")
                this.findAllTransactions()
            }),
            catchError(ex => {
                this.toastr.error(ex.message)
                throw new Error(ex.message)
            })
        )
    }
}