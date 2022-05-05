import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core'
import { UsersService } from '../services/users.service'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { MatDialog } from '@angular/material/dialog'
import { ModalComponent } from '../components/modal/modal.component'
import { Subject, takeUntil } from 'rxjs'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'role', 'username', 'actions']
  dataSource = new MatTableDataSource()

  private destroy$ = new Subject<any>()

  constructor(private usersSvc: UsersService, private dialog: MatDialog) { }
  
  @ViewChild(MatSort) sort!: MatSort
  
  ngOnInit(): void {
    this.usersSvc.getAll().subscribe( users => this.dataSource.data = users )
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort
  }

  ngOnDestroy(): void {
    this.destroy$.next({})
    this.destroy$.complete()
  }

  onOpenModal(user={}) {
    this.dialog.open(ModalComponent, {
      height: '400px',
      width: '600px',
      hasBackdrop: false,
      data: { title: 'New User', user },
    })
  }

  onDelete(userId: number) {
    if(window.confirm('Are you sure removing this user?')) {
      this.usersSvc.delete(userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => window.alert(res.message))
    }
  }
}
