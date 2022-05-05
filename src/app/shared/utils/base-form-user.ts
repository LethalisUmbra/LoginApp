import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Injectable({providedIn: 'root'})
export class BaseFormUser {
    private isValidEmail:RegExp = /\S+@\S+\.\S+/
    errorMessage = ""

    constructor(private fb:FormBuilder) {}

    baseForm = this.fb.group({
        username: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        role: ['', [Validators.required]]
    })

    isValidField(field: string):boolean {
        this.getErrorMessage(field)
        let formField = this.baseForm.get(field)!
        return ( formField.touched! || formField.dirty! ) && !formField.valid
      }
    
      private getErrorMessage(field: string) {
        const { errors } = this.baseForm.get(field)!

        if (errors) {
            const minLength = errors?.['minlength']?.requiredLength
            const errorKey = Object.keys(errors).find(Boolean)!
            if (errorKey == 'required') this.errorMessage = 'You must enter a value'
            else if (errorKey == 'pattern') this.errorMessage = 'Not a valid email'
            else if (errorKey == 'minLength') this.errorMessage = `Field must be longer than ${minLength} characters`
        }
      }
}
