import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class DashService {

  constructor(private shared: SharedService) { }

  getLogs(){
    let model:any = {};
    model.apiKey = this.shared.getUser().apiKey;

    return this.shared.http.post(this.shared.baseUrl + 'dashboard/logs', model);
  }

  downloadLogs(){
    let model:any = {};
    model.apiKey = this.shared.getUser().apiKey;

    window.open(this.shared.baseUrl + 'excel/export/logs/' + this.shared.getUser().email);
  }
}