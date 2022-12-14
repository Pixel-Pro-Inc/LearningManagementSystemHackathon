import { Component, OnInit, ViewChild } from '@angular/core';
import {
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  MonthAgendaService,
  TimelineViewsService,
  TimelineMonthService,
  EventSettingsModel,
  ScheduleComponent,
} from '@syncfusion/ej2-angular-schedule';
import { AccountService } from 'src/app/_services/account.service';
import { DashboardService } from 'src/app/_services/dashboard.service';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    MonthAgendaService,
    TimelineViewsService,
    TimelineMonthService,
  ],
})
export class CalendarComponent implements OnInit {
  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;

  toggleNav() {
    let navLinks = document.getElementById('navbarCollapse');
    console.log(navLinks);
    navLinks.classList.toggle('collapse');
  }

  signOut() {
    this.accountService.logout();
  }

  isTeacher() {
    return (
      this.shared.getUser().accountType == this.shared.AccountTypes.Teacher
    );
  }

  getUser() {
    return this.shared.getUser();
  }

  constructor(
    private shared: SharedService,
    private dashboardService: DashboardService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments() {
    this.dashboardService.getAppointments(this.shared.getUser()).subscribe(
      (response) => {
        let model: any = response;

        if (model == null) {
          return;
        }
        this.data = JSON.parse(model.event);

        this.scheduleObj.addEvent(this.data);
      },
      (error) => {
        this.shared.toastr.error(error.error);
      }
    );
  }

  saveAppointments() {
    let appointments: any = {
      ownerId: this.shared.getUser().organizationId,
      event: JSON.stringify(this.scheduleObj.getEvents()),
    };

    this.dashboardService.create_Edit_Appointment(appointments).subscribe(
      (response) => {},
      (error) => {
        this.shared.toastr.error(error.error);
      }
    );
  }

  onCreated() {
    this.scheduleObj.addEventListener('popupClose', () => {
      setTimeout(() => {
        this.saveAppointments();
      }, 1000);
    });
  }

  public data: any = [];
  public eventSettings: EventSettingsModel = {
    dataSource: this.data,
  };
}
