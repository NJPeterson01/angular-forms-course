import {Component} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'create-course-step-3',
  templateUrl: 'create-course-step-3.component.html',
  styleUrls: ['create-course-step-3.component.scss']
})
export class CreateCourseStep3Component {

  // Using a form array, we can add multiple formControls instead of replicating them
  form: FormGroup = this.fb.group({
    lessons: this.fb.array([])
  });

  constructor(private fb: FormBuilder) {

  }

  // Getter for lessons array
  get lessons() {
    return this.form.controls["lessons"] as FormArray;
  }

  addLesson(): void {
    const lessonForm = this.fb.group({
      title: ['', Validators.required],
      level: ['beginner', Validators.required]
    });

    // Calls getter for lessons form control
    this.lessons.push(lessonForm);
  }

  deleteLesson(index: number): void {
    this.lessons.removeAt(index);
  }

}
