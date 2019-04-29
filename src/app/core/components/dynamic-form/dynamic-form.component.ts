import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormField} from "@app/shared/models/form-field";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {QueryStatus, Operations} from "@app/shared/enums";

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input() model: any;
  @Input() fields: FormField[];
  @Input() operation: Operations;
  @Input() errorMessage: string;
  @Output() create: EventEmitter<any> = new EventEmitter();
  @Output() update: EventEmitter<any> = new EventEmitter();

  private Operations = Operations;
  private QueryStatus = QueryStatus;

  private form: FormGroup;
  private status: QueryStatus = QueryStatus.idle;
  private submitted: boolean = false;
  private localModel: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.operation = +params['operation'];
      this.clearForm();
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if(changes['errorMessage'] && changes['errorMessage'].currentValue && this.status === QueryStatus.pending) {
      this.status = QueryStatus.idle;
    }
  }

  clearForm() {
    const group = {};
    this.localModel = Object.assign({}, this.model);
    this.fields.forEach((field: FormField) => {
      group[field.name] = field.required ?
        new FormControl(this.localModel[field.name], Validators.required) :
        new FormControl(this.localModel[field.name])
    });
    this.form = new FormGroup(group);
  }
  save(eventType: string) {
    this.submitted = true;
    if (this.form.valid) {
      this.status = QueryStatus.pending;
      this[eventType].emit(this.form.value);
    }
  }
  onBack() {
    this.errorMessage = null;
    this.location.back();
  }
  onEdit() {
    this.router.navigate(['../', Operations.edit], {relativeTo: this.route});
  }
  onCancel() {
    this.onBack();
  }
  onSave() {
    this.save('update');
  }
  onCreate() {
    this.save('create');
  }
  onSubmit() {
    if (this.operation === Operations.edit) {
      this.onSave();
    }
    else if (this.operation === Operations.create) {
      this.onCreate();
    }
  }
}
