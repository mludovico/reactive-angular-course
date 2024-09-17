import {Component, Input, OnInit} from '@angular/core';
import {Course} from "./course.model";
import {Lesson} from "../search-lessons/lesson.model";
import {combineLatest, map, Observable, startWith, tap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {CoursesService} from "./course.service";
import {AsyncPipe} from "@angular/common";

interface CourseData {
  course: Course;
  lessons: Lesson[];
}

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css',
})
export class CourseComponent {
  data$: Observable<CourseData>;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
    ) {
    const courseId = parseInt(this.route.snapshot.paramMap.get('courseId'));
    const course$ = this.coursesService.loadCourseById(courseId)
      .pipe(
        startWith(null)
      );
    const lessons$ = this.coursesService.loadAllCourseLessons(courseId)
      .pipe(
        startWith([])
      );

    this.data$ = combineLatest([course$, lessons$])
      .pipe(
        map(([course, lessons]) => {
          return {
            course,
            lessons
          }
        }),
        tap(console.log)
      );
  }

}
