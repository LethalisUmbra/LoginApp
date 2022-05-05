import { Component, OnDestroy, OnInit } from '@angular/core'
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { BaseFormUser } from '@shared/utils/base-form-user'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription()
  hide = true

  constructor(private authSvc: AuthService, private router: Router, public loginForm: BaseFormUser) { }

  ngOnInit(): void {
    this.loginForm.baseForm.get('role')?.clearValidators()
    this.loginForm.baseForm.updateValueAndValidity()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onLogin(): void {
    if (this.loginForm.baseForm.invalid) return
    const formValue = this.loginForm.baseForm.value
    this.subscription = this.authSvc.login(formValue).subscribe( () => this.router.navigate(['/']) )
  }

  checkField(field: string):boolean {
    return this.loginForm.isValidField(field)
  }
}
