import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '@app/pages/auth/auth.service';
import { UtilsService } from '@app/shared/services/utils.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private authSvc: AuthService, private utilsSvc: UtilsService) { }

  ngOnInit(): void {
  }

  onExit() {
    console.log('Emit CloseSidenav')
    this.utilsSvc.openSidebar(false)
    this.authSvc.logout()
  }

}
