import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'src/app/_services/account.service';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'],
})
export class StudentDashboardComponent implements OnInit {
  messageForm: FormGroup;
  userSearchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    public shared: SharedService
  ) {}

  initializeForm() {
    this.messageForm = this.fb.group({
      content: ['', []],
    });

    this.userSearchForm = this.fb.group({
      username: ['', []],
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  sidebarToggle() {
    let sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
  }

  sendMessage() {}

  searchUser() {}
}
