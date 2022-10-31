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

  @ViewChild('pdfComponent') pdfComponent: PdfComponent;
  @ViewChild('docComponent') docComponent: DocEditorComponent;
  @ViewChild('excelComponent') excelComponent: ExcelComponent;

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
  }

  openEditor(file: any) {
    if (file.fileType == 'pdf') {
      this.toggleApp('pdf');
      //Load Doc

      this.pdfComponent.loadPDF(file.fileUrl);
    }

    if (file.fileType == 'docx') {
      this.toggleApp('word');
      //Load Doc

      this.docComponent.loadDoc(file);
    }

    if (file.fileType == 'xlsx') {
      this.toggleApp('excel');
      //Load Doc

      this.excelComponent.loadDoc(file);
    }
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
    let adoc = document.getElementById('sidebar');
    adoc.classList.toggle('close');

    let _doc = document.getElementById('home');
    _doc.classList.toggle('close');

    let doc = document.getElementById(element);
    doc.classList.toggle('close');
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
