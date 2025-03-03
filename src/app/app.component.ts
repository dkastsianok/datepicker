import {Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatDatepickerInput, MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {NgxMatDatepickerInput, NgxMatDatepickerToggle, NgxMatDatetimepicker} from '@ngxmc/datetime-picker';


@Component({
  selector: 'app-root',
  imports: [MatDatepickerModule, MatFormField, MatInput, MatLabel, MatDatepickerInput, MatHint, MatButton, ReactiveFormsModule, NgxMatDatepickerInput, NgxMatDatepickerToggle, NgxMatDatetimepicker],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [		]
})
export class AppComponent {
  title = 'untitled1';
  public control = new FormControl<Date | undefined>(undefined, {nonNullable: true});
}
