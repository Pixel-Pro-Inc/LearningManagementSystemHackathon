import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessmentComponent } from './components/assessment/assessment.component';
import { AssignmentComponent } from './components/assignment/assignment.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CourseStaffComponent } from './components/course-staff/course-staff.component';
import { CourseComponent } from './components/course/course.component';
import { DocEditorComponent } from './components/doc-editor/doc-editor.component';
import { DriveComponent } from './components/drive/drive.component';
import { ExcelComponent } from './components/excel/excel.component';
import { LoginComponent } from './components/login/login.component';
import { OfficeComponent } from './components/office/office.component';
import { PdfComponent } from './components/pdf/pdf.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { LoggedInStudentGuard } from './_guards/logged-in-student.guard';
import { LoggedInTeacherGuard } from './_guards/logged-in-teacher.guard';

const routes: Routes = [
  {
    path: 'student-dashboard',
    component: StudentDashboardComponent,
    canActivate: [LoggedInStudentGuard],
  },
  {
    path: 'teacher-course',
    component: CourseStaffComponent,
    canActivate: [LoggedInTeacherGuard],
  },
  {
    path: 'teacher-assessment',
    component: AssessmentComponent,
    canActivate: [LoggedInTeacherGuard],
  },
  {
    path: 'teacher-assignment',
    component: AssignmentComponent,
    canActivate: [LoggedInTeacherGuard],
  },
  {
    path: 'teacher-dashboard',
    component: TeacherDashboardComponent,
    canActivate: [LoggedInTeacherGuard],
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    loadChildren: () =>
      import('./_modules/calendar/calendar.module').then(
        (x) => x.CalendarModule
      ),
  },
  { path: '', component: LoginComponent },
  {
    path: 'myoffice',
    component: OfficeComponent,
    loadChildren: () =>
      import('./_modules/office/office.module').then((x) => x.OfficeModule),
  },
  {
    path: 'excel',
    component: ExcelComponent,
    loadChildren: () =>
      import('./_modules/office/office.module').then((x) => x.OfficeModule),
  },
  {
    path: 'word',
    component: DocEditorComponent,
    loadChildren: () =>
      import('./_modules/office/office.module').then((x) => x.OfficeModule),
  },
  {
    path: 'pdf',
    component: PdfComponent,
    loadChildren: () =>
      import('./_modules/office/office.module').then((x) => x.OfficeModule),
  },
  { path: 'mydrive', component: DriveComponent },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'course',
    component: CourseComponent,
    canActivate: [LoggedInStudentGuard],
  },
  {
    path: 'assignment',
    component: AssignmentComponent,
    canActivate: [LoggedInStudentGuard],
  },
  {
    path: 'assessment',
    component: AssessmentComponent,
    canActivate: [LoggedInStudentGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
