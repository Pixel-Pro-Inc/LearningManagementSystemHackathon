import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { MessagingComponent } from './components/messaging/messaging.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { MsgInputComponent } from './_forms/msg-input/msg-input.component';
import { OfficeComponent } from './components/office/office.component';
import { PowerpointComponent } from './components/powerpoint/powerpoint.component';
import { DriveComponent } from './components/drive/drive.component';
import { CourseComponent } from './components/course/course.component';
import { FilePreviewComponent } from './components/file-preview/file-preview.component';
import { AssignmentComponent } from './components/assignment/assignment.component';
import { AssessmentComponent } from './components/assessment/assessment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CourseStaffComponent } from './components/course-staff/course-staff.component';
import { AssessmentTeacherComponent } from './components/assessment-teacher/assessment-teacher.component';
import { AssignmentTeacherComponent } from './components/assignment-teacher/assignment-teacher.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    FooterComponent,
    TextInputComponent,
    MessagingComponent,
    StudentDashboardComponent,
    TeacherDashboardComponent,
    MsgInputComponent,
    OfficeComponent,
    PowerpointComponent,
    DriveComponent,
    CourseComponent,
    FilePreviewComponent,
    AssignmentComponent,
    AssessmentComponent,
    ProfileComponent,
    CourseStaffComponent,
    AssessmentTeacherComponent,
    AssignmentTeacherComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
