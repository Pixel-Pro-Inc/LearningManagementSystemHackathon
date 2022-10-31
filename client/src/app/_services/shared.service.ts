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

  public AccountTypes: any = {
    Student: 'Student',
    Clerical: 'Clerical',
    Teacher: 'Teacher',
    Head_Of_Department: 'Head_Of_Department',
    Principal: 'Principal',
  };

  public Level: any = {
    Grade_1: 'Grade_1',
    Grade_2: 'Grade_2',
    Grade_3: 'Grade_3',
    Grade_4: 'Grade_4',
    Grade_5: 'Grade_5',
    Grade_6: 'Grade_6',
    Grade_7: 'Grade_7',
    Form_1: 'Form_1',
    Form_2: 'Form_2',
    Form_3: 'Form_3',
    Form_4: 'Form_4',
    Form_5: 'Form_5',
    Form_6A: 'Form_6A',
    Form_6B: 'Form_6B',
    Level_100: 'Level_100',
    Level_200: 'Level_200',
    Level_300: 'Level_300',
    Level_400: 'Level_400',
    Level_500: 'Level_500',
    PostGraduate: 'PostGraduate',
  };

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

  public baseUrl = 'https://learning-system-hack.herokuapp.com/api/';
  //public baseUrl = 'https://localhost:7294/api/';
}
