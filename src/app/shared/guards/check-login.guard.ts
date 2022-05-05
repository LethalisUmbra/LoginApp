import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '@app/pages/auth/auth.service';
import { map, Observable, take } from 'rxjs';
import { UserResponse } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {
  constructor(private authSvc: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.authSvc.user$.pipe(
      take(1),
      map( (user:UserResponse) => (!user ? true : false) )
    )
  }
  
}
