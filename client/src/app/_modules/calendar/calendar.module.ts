import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ScheduleModule,
  RecurrenceEditorModule,
} from '@syncfusion/ej2-angular-schedule';
import { CalendarComponent } from 'src/app/components/calendar/calendar.component';

@NgModule({
  declarations: [CalendarComponent],
  imports: [CommonModule, ScheduleModule, RecurrenceEditorModule],
})
export class CalendarModule {}
