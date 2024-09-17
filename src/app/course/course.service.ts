import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map, Observable, shareReplay} from "rxjs";
import {Course, sortCoursesBySeqNo} from "./course.model";
import {Lesson} from "../search-lessons/lesson.model";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private http: HttpClient) {
  }

  loadAllCourses(): Observable<Course[]> {
    return this.http.get('/api/courses')
      .pipe(
        map((res) => res["payload"]),
        // @ts-ignore
        shareReplay()
      );
  }

  saveCourse(courseId: number, changes: Partial<Course>): Observable<any> {
    return this.http.put(`/api/courses/${courseId}`, changes)
      .pipe(

        shareReplay()
      );
  }

  searchLessons(search: string): Observable<Lesson[]> {
    return this.http.get('/api/lessons', {
      params: {
        filter: search,
        sortOrder: 'asc',
        pageSize: '100',
        pageNumber: '0',
        // courseId: ,
      }
    })
      .pipe(
        map(res => res['payload']),
        shareReplay()
      );
  }

  loadCourseById(courseId: number) {
    return this.http.get<Course>(`/api/courses/${courseId}`)
      .pipe(
        shareReplay()
      );
  }

  loadAllCourseLessons(courseId: number): Observable<Lesson[]> {
    return this.http.get(`/api/lessons`, {
      params: {
        courseId: courseId.toString(),
        pageSize: '100'
      }
    })
      .pipe(
        map(res => res['payload']),
        shareReplay()
      );
  }
}
