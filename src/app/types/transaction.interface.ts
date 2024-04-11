import { ICategory } from "./category.interface"

export type TransactionType = "income" | "outcome"

export interface ITransaction {
    id: string,
    title: string,
    amount: number,
    type: TransactionType,
    category: ICategory | null
}