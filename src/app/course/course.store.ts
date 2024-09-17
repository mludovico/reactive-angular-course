import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, map, Observable, shareReplay, tap, throwError} from "rxjs";
import {Course, sortCoursesBySeqNo} from "./course.model";
import {LoadingService} from "../loading/loading.service";
import {MessagesService} from "../messages/messages.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CourseStore {
  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private messagesService: MessagesService,
  ) {
    this.loadAllCourses();
  }

  private subject = new BehaviorSubject<Course[]>([]);

  courses$ = this.subject.asObservable();

  loadAllCourses() {
    const loadCourses$ = this.http.get<Course[]>('/api/courses')
      .pipe(
        map(response => response['payload']),
        catchError(err => {
          const message = 'Could not load courses';
          this.messagesService.showErrors(message);
          console.error(message, err);
          return throwError(err);
        }),
        tap(courses => this.subject.next(courses))
      );

    this.loadingService.setLoadingUntilCompleted(loadCourses$)
      .subscribe();
  }

  filterByCategory(category: string): Observable<Course[]> {
    return this.courses$
      .pipe(
        map(
          courses => courses.filter(course => course.category == category)
            .sort(sortCoursesBySeqNo)
        )
      );
  }

  saveCourse(courseId: number, changes: Partial<Course>): Observable<any> {
    const courses = this.subject.getValue();
    const index = courses.findIndex(course => course.id == courseId);
    const newCourse: Course = {
      ...courses[index],
      ...changes
    };

    return this.http.put(`/api/courses/${courseId}`, changes)
      .pipe(
        catchError(err => {
          const message = 'Could not save course';
          this.messagesService.showErrors(message);
          console.error(message, err);
          return throwError(err);
        }),
        shareReplay(),
        tap(() => {
          const newCourses = courses.slice(0);
          newCourses[index] = newCourse;
          this.subject.next(newCourses);
        })
      );
  }
}
