import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Roles, User, UserResponse } from '@shared/models/user.interface'
import { environment } from '@env/environment'
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs'
import { JwtHelperService } from '@auth0/angular-jwt'
import { Router } from '@angular/router'

const helper = new JwtHelperService()

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = new BehaviorSubject<UserResponse>(null!)


  constructor(private http: HttpClient, private router: Router) {
    this.checkToken()
  }

  get user$(): Observable<UserResponse> {
    return this.user.asObservable()
  }

  get userValue(): UserResponse {
    return this.user.getValue()
  }

  login(authData: User): Observable<UserResponse | void> {
    return this.http.post<UserResponse>(`${environment.API_URL}/auth/login`, authData)
    .pipe(
      map( (user: UserResponse) => {
        this.saveLocalStorage(user)
        this.user.next(user)
        return user
      } ),
      catchError( (err) => this.handleError(err) ) 
    )
  }

  logout(): void {
    localStorage.removeItem('user')
    this.user.next(null!)
    this.router.navigate(['/login'])
  }

  private checkToken(): void {
    const user = JSON.parse(localStorage.getItem('user')!) || null

    if (user) {
      const isExpired = helper.isTokenExpired(user.token)

      if (isExpired) this.logout
      else
        this.user.next(user)
    }
  }

  private saveLocalStorage(user: UserResponse): void {
    const { userId, message, ...rest } = user
    localStorage.setItem('user', JSON.stringify(rest))
  }

  private handleError(err: any): Observable<never> {
    this.logout()
    let errorMessage = err ? `Error: code ${err.message}` : 'An error has ocurred retrieving data'
    window.alert('Wrong username or password')
    return throwError( () => new Error(errorMessage) )
  }
}
