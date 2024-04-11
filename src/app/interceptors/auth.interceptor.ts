import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userId = !!localStorage.getItem("userId")
    //se è presente il token userId lo aggiungo a tutte le richieste al back-end
    if (userId)
      request.clone({ setHeaders: { Description: `O_o` } })
    return next.handle(request)
  }

}