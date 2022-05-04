import { Component, OnDestroy, OnInit } from '@angular/core'
import { AuthService } from '../auth.service'
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private isValidEmail = /\S+@\S+\.\S+/
  private subscription: Subscription = new Subscription()
  hide = true

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor(private authSvc: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onLogin(): void {
    if (this.loginForm.invalid) return
    const formValue = this.loginForm.value
    this.subscription = this.authSvc.login(formValue).subscribe( () => this.router.navigate(['/']) )
  }

  isValidField(field: string):boolean {
    let formField = this.loginForm.get(field)!
    
    return ( formField.touched! || formField.dirty! ) && !formField.valid
  }

  getErrorMessage(field: string) {
    let message;
    let formField = this.loginForm.get(field)!

    if (formField.errors?.['required']) {
      message = 'You must enter a value'
    } else if (formField.hasError('pattern')) {
      message = 'Not a valid email'
    } else if (formField.errors?.['minlength']) {
      const minLength = formField.errors?.['minlength'].requiredLength
      message = `Field must be longer than ${minLength} characters`
    } else if (formField.errors) {
      console.log(formField.errors)
    }

    return message
  }
}
