import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { IAuthUser, IUser } from "../types/user.interface";
import { apiUrl } from "../constants/constants";
import { catchError, pipe, tap } from "rxjs";

@Injectable(
    { providedIn: "root" }
)
export class AuthService {

    isAuthenticatedSig = signal<boolean>(false)

    constructor(private readonly httpClient: HttpClient,
        private readonly router: Router,
        private readonly toastrService: ToastrService) {
        this.isAuthenticatedSig.set(!!localStorage.getItem("userId"))
    }

    signUp(userData: IAuthUser) {
        return this.httpClient.post(`${apiUrl}/signup`, userData).pipe(
            catchError(err => {
                this.handleError(err)
                throw new Error(err.message)
            }),
            pipe(tap(() => this.signIn(userData)))
        ).subscribe(
            () => this.toastrService.info("User created succesfully")
        )
    }

    signIn(userData: IAuthUser) {
        return this.httpClient.get<IUser[]>(`${apiUrl}/signup?email=` + encodeURIComponent(userData.email)).pipe(
            catchError(err => {
                this.handleError(err)
                throw new Error(err)
            }),
            tap((res: IUser[]) => {
                let correctAuthData = false
                res.every(value => {
                    correctAuthData = value.password == userData.password
                })
                if (correctAuthData) {
                    this.toastrService.success("Logged in succesfully")
                    localStorage.setItem("userId", res[0]?.id)
                    localStorage.setItem("userName", res[0]?.email)
                    this.isAuthenticatedSig.set(true)
                    this.router.navigate(['/home'])
                }
                else
                    this.toastrService.error("Email or password is not correct")
            })
        ).subscribe()
    }

    logOff(): void {
        localStorage.removeItem("userId")
        this.isAuthenticatedSig.set(false)
        this.router.navigate(['/login'])
        this.toastrService.show("Logged out")
    }

    private handleError(err: HttpErrorResponse): void {
        this.toastrService.error(err.message)
    }
}