import { NgModule } from "@angular/core"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatSidenavModule } from "@angular/material/sidenav"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { MatButtonModule } from "@angular/material/button"
import { MatMenuModule } from "@angular/material/menu"
import { MatListModule } from "@angular/material/list"
import { MatIconModule } from "@angular/material/icon"
import { MatCardModule } from "@angular/material/card"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatTableModule } from "@angular/material/table"
import { MatSortModule } from "@angular/material/sort"
import { MatDialogModule } from "@angular/material/dialog"
import { MatSelectModule } from "@angular/material/select"
import { MatOptionModule } from "@angular/material/core"

const myModules:any = [
    MatToolbarModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule
]

@NgModule({
    imports: [...myModules],
    exports: [...myModules]
})

export class MaterialModule {}