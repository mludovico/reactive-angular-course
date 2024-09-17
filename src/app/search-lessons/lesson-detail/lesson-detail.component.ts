import {Component, Input, OnInit} from '@angular/core';
import {Lesson} from "../lesson.model";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-lesson-detail',
  standalone: true,
  imports: [],
  templateUrl: './lesson-detail.component.html',
  styleUrl: './lesson-detail.component.css'
})
export class LessonDetailComponent implements OnInit {
  @Input() lesson: Lesson;

  iframeUrl: SafeUrl;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    const videoUrl = `https://www.youtube.com/embed/${this.lesson.videoId}`
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }
}
