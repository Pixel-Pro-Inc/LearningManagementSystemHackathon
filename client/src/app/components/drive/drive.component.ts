import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.css'],
})
export class DriveComponent implements OnInit {
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
