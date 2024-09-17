import {Component} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {FooterComponent} from "./footer/footer.component";
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatSidenav, MatSidenavContainer} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIconButton} from "@angular/material/button";
import {LoadingComponent} from "./loading/loading.component";
import {LoadingService} from "./loading/loading.service";
import {MessagesComponent} from "./messages/messages.component";
import {MessagesService} from "./messages/messages.service";
import {DrawerMenuComponent} from "./drawer-menu/drawer-menu.component";
import {AuthStore} from "./login/auth.store";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    NgForOf,
    MatButtonToggleGroup,
    MatButtonToggle,
    AsyncPipe,
    MatSidenavContainer,
    MatSidenav,
    MatNavList,
    MatIcon,
    MatListItem,
    RouterLink,
    MatToolbar,
    MatIconButton,
    LoadingComponent,
    MessagesComponent,
    DrawerMenuComponent,
  ],
  providers: [AuthStore],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(
    private authStore: AuthStore,
    private router: Router,
  ) {
  }

  logout() {
    this.authStore.logout();
    this.router.navigateByUrl("/login")
  }
}
