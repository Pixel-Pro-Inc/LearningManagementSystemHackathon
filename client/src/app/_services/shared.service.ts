import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BusyService } from './busy.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  user: any = {};

  constructor(
    public http: HttpClient,
    public toastr: ToastrService,
    public router: Router,
    public busyService: BusyService
  ) {}

  public setUser(model: any) {
    localStorage.setItem('user', JSON.stringify(model));
  }

  public getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  public removeUser() {
    localStorage.removeItem('user');
  }

  //public baseUrl = 'https://coretransact.azurewebsites.net/api/';
  public baseUrl = 'https://localhost:7294/api/';
}
