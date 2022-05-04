import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "@app/pages/auth/auth.service";
import { Observable } from "rxjs";

@Injectable()
export class AdminInterceptor implements HttpInterceptor {
    constructor(private authSvc: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        if (req.url.includes('users')){
            const authToken = this.authSvc.userTokenValue
            const authRequest = req.clone({ setHeaders:{ auth: authToken } })
            return next.handle(authRequest)
        }
        return next.handle(req)
    }
}