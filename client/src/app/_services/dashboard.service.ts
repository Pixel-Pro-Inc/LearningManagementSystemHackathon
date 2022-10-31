import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private shared: SharedService) {}

  getAnnouncements(user: any) {
    return this.shared.http.post(
      this.shared.baseUrl + 'dashboard/announcement/retrieve',
      user
    );
  }

  create_Edit_Appointment(model: any) {
    return this.shared.http.post(
      this.shared.baseUrl + 'dashboard/appointment/create_update',
      model
    );
  }

  getAppointments(model: any) {
    return this.shared.http.post(
      this.shared.baseUrl + 'dashboard/appointment/retrieve',
      model
    );
  }
}
