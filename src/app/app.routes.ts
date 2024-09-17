import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {SearchLessonsComponent} from "./search-lessons/search-lessons.component";
import {AboutComponent} from "./about/about.component";
import {LoginComponent} from "./login/login.component";
import {CourseComponent} from "./course/course.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'search-lessons',
    component: SearchLessonsComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'courses/:courseId',
    component: CourseComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
