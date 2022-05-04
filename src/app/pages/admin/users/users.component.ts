import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { UsersService } from '../services/users.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['id', 'role', 'username']
  dataSource = new MatTableDataSource()

  constructor(private usersSvc: UsersService) { }
  
  @ViewChild(MatSort) sort!: MatSort
  
  ngOnInit(): void {
    this.usersSvc.getAll().subscribe( users => this.dataSource.data = users )
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort
  }
}
