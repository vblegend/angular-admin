import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericDrawerComponent } from '@core/components/basic/generic.drawer';

@Component({
  selector: 'ngx-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.less']
})
export class TaskAddComponent extends GenericDrawerComponent<string, boolean> {
  validateForm!: FormGroup;
  constructor(injector: Injector, private fb: FormBuilder) {
    super(injector);
  }



  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }





  public onInit(): void {

    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
    console.log(this.input);
  }


  public submit(): void {
    this.close(true);
  }

  public cancel(): void {
    this.close(false);
  }


  public onDestroy(): void {

  }

}
