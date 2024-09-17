import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MessagesService} from "./messages.service";
import {AsyncPipe} from "@angular/common";
import {Observable, tap} from "rxjs";

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    MatIcon,
    AsyncPipe
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit {
  showMessages = false;
  errors$: Observable<string[]>;

  constructor(protected messagesService: MessagesService) {
    console.log('MessagesComponent created')
  }

  ngOnInit() {
    this.errors$ = this.messagesService.errors$
      .pipe(
        tap(() => this.showMessages = true)
      );
  }

  onClose() {
    this.showMessages = false;
  }
}
