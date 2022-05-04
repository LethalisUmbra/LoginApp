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
  private loggedIn = new BehaviorSubject<boolean>(false)
  private role = new BehaviorSubject<Roles>(null)
  private userToken = new BehaviorSubject<string>("")

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken()
  }

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable()
  }

  get isAdmin$(): Observable<Roles> {
    return this.role.asObservable()
  }

  get userTokenValue() {
    return this.userToken.getValue()
  }

  login(authData: User): Observable<UserResponse | void> {
    return this.http.post<UserResponse>(`${environment.API_URL}/auth/login`, authData)
    .pipe(
      map( (user: UserResponse) => {
        this.saveLocalStorage(user)
        this.loggedIn.next(true)  
        this.role.next(user.role)
        this.userToken.next(user.token)
        return user
      } ),
      catchError( (err) => this.handleError(err) ) 
    )
  }

  logout(): void {
    localStorage.removeItem('user')
    this.loggedIn.next(false)
    this.role.next(null)
    this.userToken.next("")
    this.router.navigate(['/login'])
  }

  private checkToken(): void {
    const user = JSON.parse(localStorage.getItem('user')!) || null

    if (user) {
      const isExpired = helper.isTokenExpired(user.token)

      if (isExpired) this.logout
      else
        this.loggedIn.next(true)
        this.role.next(user.role)
        this.userToken.next(user.token)
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
