import {Component, OnInit} from '@angular/core';
import {catchError, finalize, map, Observable, throwError} from "rxjs";
import {Course, sortCoursesBySeqNo} from "../course/course.model";
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatTab, MatTabGroup, MatTabLabel} from "@angular/material/tabs";
import {MatIcon} from "@angular/material/icon";
import {CourseCardComponent} from "../course-card/course-card.component";
import {LoadingService} from "../loading/loading.service";
import {MessagesService} from "../messages/messages.service";
import {CourseStore} from "../course/course.store";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    MatTabGroup,
    MatTab,
    MatIcon,
    MatTabLabel,
    CourseCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>
  advancedCourses$: Observable<Course[]>

  constructor(
    private loadingService: LoadingService,
    private messagesService: MessagesService,
    private courseStore: CourseStore
  ) {
  }

  ngOnInit() {
    this.loadAllCourses();
  }

  loadAllCourses() {
    this.beginnerCourses$ = this.courseStore.filterByCategory('BEGINNER');
    this.advancedCourses$ = this.courseStore.filterByCategory('ADVANCED');
  }

}
