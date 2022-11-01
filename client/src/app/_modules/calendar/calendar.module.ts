import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ScheduleModule,
  RecurrenceEditorModule,
} from '@syncfusion/ej2-angular-schedule';
import { CalendarComponent } from 'src/app/components/calendar/calendar.component';

const routes: Routes = [
  {
    path: '',
    component: CalendarComponent,
  },
];

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    ScheduleModule,
    RecurrenceEditorModule,
    RouterModule.forChild(routes),
  ],
})
export class CalendarModule {}
