import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AccountService } from 'src/app/_services/account.service';
import { DriveService } from 'src/app/_services/drive.service';
import { SharedService } from 'src/app/_services/shared.service';
import { DocEditorComponent } from '../doc-editor/doc-editor.component';
import { ExcelComponent } from '../excel/excel.component';
import { PdfComponent } from '../pdf/pdf.component';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css'],
})
export class OfficeComponent implements OnInit {
  docSearchForm: FormGroup;
  files: any = [];

  constructor(
    private fb: FormBuilder,
    public shared: SharedService,
    public driveService: DriveService
  ) {}

  initializeForm() {
    this.docSearchForm = this.fb.group({
      document: ['', []],
    });
  }

  ngOnInit(): void {
    this.initializeForm();
    this.populateDocuments();

    this.clearFileLocal();
  }

  clearFileLocal() {
    localStorage.removeItem('localFile');
  }

  openEditor(file: any) {
    localStorage.setItem('localFile', JSON.stringify(file));

    let dest: string = '';

    if (file.fileType == 'pdf') {
      dest = 'pdf';
    }

    if (file.fileType == 'docx') {
      dest = 'word';
    }

    if (file.fileType == 'xlsx') {
      dest = 'excel';
    }

    this.shared.router.navigateByUrl('/' + dest);
  }

  populateDocuments() {
    this.driveService.getDocuments(this.shared.getUser()).subscribe(
      (response) => {
        this.files = response;
      },
      (error) => {
        this.shared.toastr.error(error.error);
      }
    );
  }

  toggleApp(element: string) {
    this.shared.router.navigateByUrl('/' + element);
  }

  reloadPage() {
    window.location.reload();
  }

  sidebarToggle() {
    let sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
  }

  searchDoc() {}
}
