import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '@app/pages/auth/auth.service';
import { UserResponse } from '@app/shared/models/user.interface';
import { UtilsService } from '@app/shared/services/utils.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAdmin!:string
  isLogged = false

  private destroy$ = new Subject<any>()

  @Output() toggleSidenav = new EventEmitter<void>()
  @Output() closeSidenav = new EventEmitter<void>()

  constructor(private authSvc: AuthService, private utilsSvc:UtilsService) { }

  ngOnInit(): void {
    this.authSvc.user$.pipe(takeUntil(this.destroy$)).subscribe( (user:UserResponse) => {
      this.isLogged = true
      this.isAdmin = user.role!
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next({})
    this.destroy$.complete()
  }

  onToggleSidenav(): void {
    this.toggleSidenav.emit()
  }

  onLogout() {
    this.utilsSvc.openSidebar(false)
    this.authSvc.logout()
  }
}
