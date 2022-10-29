import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {}

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
      this.sharedService.getUser().accountType ==
      this.sharedService.AccountTypes.Teacher
    );
  }
}
