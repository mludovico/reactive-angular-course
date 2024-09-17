import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {provideNativeDateAdapter} from "@angular/material/core";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {Observable} from "rxjs";
import {Lesson} from "./lesson.model";
import {CoursesService} from "../course/course.service";
import {AsyncPipe} from "@angular/common";
import {LessonDetailComponent} from "./lesson-detail/lesson-detail.component";

@Component({
  selector: 'app-search-lessons',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    AsyncPipe,
    LessonDetailComponent,
  ],
  templateUrl: './search-lessons.component.html',
  styleUrl: './search-lessons.component.css',
  providers: [
    provideNativeDateAdapter()
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchLessonsComponent implements OnInit {
  constructor(private coursesService: CoursesService) {
  }

  searchResults$: Observable<Lesson[]>
  activeLesson: Lesson;

  ngOnInit() {

  }

  onSearch(search: string) {
    this.searchResults$ = this.coursesService.searchLessons(search);
  }

  openLesson(lesson: Lesson) {
    this.activeLesson = lesson;
  }

  closeLesson() {
    this.activeLesson = null;
  }
}
