import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { courseTitleValidator } from "../../validators/course-title.validator";
import { CoursesService } from "../../services/courses.service";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";

interface CourseCategory {
  code: string,
  description: string
}

const localDraft = "STEP1";

@Component({
  selector: "create-course-step-1",
  templateUrl: "./create-course-step-1.component.html",
  styleUrls: ["./create-course-step-1.component.scss"],
})
export class CreateCourseStep1Component implements OnInit {
  // Async validators are expensive. Limiting them to something like after a blur is necessary to improve performance
  form = this.fb.group({
    title: [
      "",
      {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(60),
        ],
        asyncValidators: [courseTitleValidator(this.coursesService)],
        updateOn: "blur",
      },
    ],
    releaseAt: [new Date(), Validators.required],
    downloadsAllowed: [false, Validators.requiredTrue],
    longDescription: ["", [Validators.required, Validators.minLength(3)]],
    category: ['BEGINNER', Validators.required],
    //address: [null, Validators.required]
  });

  courseCategories$ : Observable<CourseCategory[]>;

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    this.courseCategories$ = this.coursesService.findCourseCategories();

    // Get any local storage draft of Step1
    const draft = localStorage.getItem(localDraft);

    if(draft) {
      // setValue allows setting of all values while patchValue only works on one
      this.form.setValue(JSON.parse(draft));
    }

    // Subscribe to only valid form values
    this.form.valueChanges
      .pipe(
        filter(() => this.form.valid)
      )
      .subscribe( val => localStorage.setItem(localDraft, JSON.stringify(val)))//Save draft of form in local storage for user convenience
  }

  get courseTitle() {
    return this.form.controls["title"];
  }
}
