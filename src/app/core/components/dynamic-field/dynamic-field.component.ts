import {Component, Input, OnInit} from '@angular/core';
import {FormField} from "@app/shared/models/form-field";
import {FormGroup} from "@angular/forms";
import { Operations } from "@app/shared/enums";

@Component({
  selector: 'dynamic-field',
  templateUrl: './dynamic-field.component.html',
  styleUrls: ['./dynamic-field.component.css']
})
export class DynamicFieldComponent implements OnInit {

  private Operations = Operations;
  @Input() field: FormField;
  @Input() form: FormGroup;
  @Input() operation: Operations;
  @Input() submitted: string;

  constructor() { }

  get isValid() {
    return this.form.controls[this.field.name].valid;
  }

  ngOnInit() {

  }

}
