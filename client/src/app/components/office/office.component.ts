import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AccountService } from 'src/app/_services/account.service';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css'],
})
export class OfficeComponent implements OnInit {
  docSearchForm: FormGroup;

  constructor(private fb: FormBuilder, public shared: SharedService) {}

  initializeForm() {
    this.docSearchForm = this.fb.group({
      document: ['', []],
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  sidebarToggle() {
    let sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
  }

  searchDoc() {}
}
