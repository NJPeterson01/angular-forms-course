import { HttpClient, HttpEventType } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from "@angular/forms";
import { of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";


/*
 This is a custom control component that can be used in Forms like other inputs (works in template or reactive forms)
*/
@Component({
  selector: "file-upload",
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"],
  providers: [
    // Accessor for Form
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FileUploadComponent
    },
    // Acessor for Validations
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: FileUploadComponent
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor, Validator {

  @Input()
  requiredFileType: string;

  fileName: string = '';

  // Upload error flag
  fileUploadError = false;

  fileUploadSuccess: boolean = false;

  uploadProgress: number = null;

  // Change function that reports back the new file name
  onChange: Function = (fileName: string) => {};

  onTouched: Function = () => {};

  onValidatorChange: Function = () => {};

  disabled: boolean = false;

  constructor(private http: HttpClient) {

  }

  onFileSelected(event) {
    const file: File = event.target.files[0];

    if(file) {
      this.fileName = file.name;

      // Form data is a standard browser function to create form payloads manually
      const formData = new FormData();

      formData.append("thumbnail", file);

      this.fileUploadError = false;

      // Upload with reporting of upload progresss
      this.http.post("/api/thumbnail-upload", formData, {
        reportProgress: true,
        observe: 'events'
      })
        .pipe(
          catchError(error => {
            this.fileUploadError = true;
            return of(error);
          }),
          finalize(() => {
            this.uploadProgress = null;
          })
        )
        .subscribe(event => {
          // File is uploading
          if(event.type == HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(100 * (event.loaded / event.total));
          }
          // File has completed uploading
          else if (event.type == HttpEventType.Response) {
            this.fileUploadSuccess = true;
            this.onChange(this.fileName);
            this.onValidatorChange();
          }
        });
    }

  }

  // Called directly by forms API to set value (patchValue)
  writeValue(obj: any): void {
    this.fileName = obj;
  }

  // If a value is changed, we want to report to the form what the new value will be. This requires a callback function
  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Takes in reference to an HTML input that can be utilized in the typescript
  onClick(fileUpload: HTMLInputElement): void {
    this.onTouched();
    fileUpload.click();
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if(this.fileUploadSuccess) {
      return null;
    }

    let errors: any = {
      requiredFileType: this.requiredFileType
    }

    if(this.fileUploadError) {
      errors.uploadFailed = true;
    }

    return errors;
  }

  // Notifies parent form of validation changes
  registerOnValidatorChange?(onValidatorChange: () => void): void {
    this.onValidatorChange = onValidatorChange;
  }

}
