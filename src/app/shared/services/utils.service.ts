import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class UtilsService {
    private sidebarOpened = new BehaviorSubject<boolean>(false)
    sidebarOpened$ = this.sidebarOpened.asObservable()

    openSidebar(value:boolean) {
        this.sidebarOpened.next(value)
    }
}