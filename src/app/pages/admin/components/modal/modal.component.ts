import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseFormUser } from '@shared/utils/base-form-user';
import { UsersService } from '../../services/users.service';

enum Action { EDIT='edit', NEW='new' }

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  actionTODO = Action.NEW
  showPasswordField = true
  hide = true
  
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, public userForm: BaseFormUser, private usersSvc: UsersService) { }

  ngOnInit(): void {
    if(this.data?.user.hasOwnProperty('id')) {
      this.actionTODO = Action.EDIT
      this.showPasswordField = false;
      this.userForm.baseForm.get('password')?.setValidators(null)
      this.userForm.baseForm.updateValueAndValidity()
      this.data.title = 'Edit User'
      this.pathFormData()
    }
  }

  onSave() {
    const formValue = this.userForm.baseForm.value
    if (this.actionTODO === Action.NEW) {
      this.usersSvc.new(formValue).subscribe( res => console.log('New->',res))
    } else {
      const userId = this.data?.user?.id
      this.usersSvc.update(formValue, userId).subscribe( res => console.log('Update->',res))
    }
  }

  checkField(field:string):Boolean {
    return this.userForm.isValidField(field)
  }

  private pathFormData() {
    this.userForm.baseForm.patchValue({
      username: this.data?.user?.username,
      role: this.data?.user?.role,
    })
  }

}
