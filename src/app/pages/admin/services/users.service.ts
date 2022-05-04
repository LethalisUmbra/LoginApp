import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { User } from '@shared/models/user.interface'
import { environment } from '@env/environment'
import { catchError, Observable, throwError } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private userApiURL = environment.API_URL + '/users'
  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http
    .get<User[]>(this.userApiURL)
    .pipe(catchError(this.handlerError))
  }

  getById(userId:number): Observable<User> {
    return this.http
    .get<User>(`${this.userApiURL}/${userId}`)
    .pipe(catchError(this.handlerError))
  }

  new(user: User): Observable<User> {
    return this.http
    .post<User>(this.userApiURL, user)
    .pipe(catchError(this.handlerError))
  }

  update(user:User, userId:number): Observable<User> {
    return this.http
    .patch<User>(`${this.userApiURL}/${userId}`, user)
    .pipe(catchError(this.handlerError))
  }

  delete(userId: number): Observable<{}> {
    return this.http
    .delete<User>(`${this.userApiURL}/${userId}`)
    .pipe(catchError(this.handlerError))
  }

  handlerError(error: Error): Observable<never> {
    let errorMessage = error ? error.message : 'Unknown error'
    window.alert(errorMessage)
    return throwError(() => new Error(errorMessage))
  }

}
