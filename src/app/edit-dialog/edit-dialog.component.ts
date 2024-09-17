import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialogModule, MatDialogRef,
} from "@angular/material/dialog";
import {Course} from "../course/course.model";
import {FormBuilder, Validators, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {LoadingService} from "../loading/loading.service";
import {LoadingComponent} from "../loading/loading.component";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MessagesComponent} from "../messages/messages.component";
import {CourseStore} from "../course/course.store";

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    LoadingComponent,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MessagesComponent,
  ],
  providers: [LoadingService, provideNativeDateAdapter()],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.css'
})
export class EditDialogComponent {
  form: FormGroup;
  course: Course;

  @ViewChild('saveButton', {static: true}) saveButton: ElementRef;
  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course,
    private courseStore: CourseStore
  ) {
    this.course = course;
    console.log('course', course);
    this.form = formBuilder.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releaseAt: [course.releaseAt, Validators.required],
      longDescription: [course.longDescription, Validators.required],
    });
  }

  categories = ['Beginner', 'Intermediate', 'Advanced']

  close() {
    this.dialogRef.close();
  }

  save() {
    const changes = this.form.value;
    this.courseStore.saveCourse(this.course.id, changes).subscribe()
    this.dialogRef.close(changes);
  }
}
