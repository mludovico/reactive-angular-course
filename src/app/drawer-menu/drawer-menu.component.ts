import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {AuthStore} from "../login/auth.store";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-drawer-menu',
  standalone: true,
  imports: [
    MatSidenav,
    MatListItem,
    RouterLink,
    MatIcon,
    MatNavList,
    AsyncPipe
  ],
  templateUrl: './drawer-menu.component.html',
  styleUrl: './drawer-menu.component.css'
})
export class DrawerMenuComponent {
  constructor(protected authStore: AuthStore) {
  }
  @Output()
  logout = new EventEmitter();

  onLogout() {
    this.logout.emit();
  }
}
