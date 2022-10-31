import { Component, OnInit, ViewChild } from '@angular/core';
import { SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';
import { DriveService } from 'src/app/_services/drive.service';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css'],
})
export class ExcelComponent implements OnInit {
  @ViewChild('spreadsheet')
  public spreadsheetObj: SpreadsheetComponent;

  constructor(
    private shared: SharedService,
    private driveService: DriveService
  ) {}

  file: any = [];

  ngOnInit(): void {}

  public loadDoc() {
    if (localStorage.getItem('localFile') == null) {
      return;
    }

    let _file: any = JSON.parse(localStorage.getItem('localFile'));

    localStorage.removeItem('localFile');

    this.file = _file;

    this.shared.http
      .get(_file.fileUrl, { responseType: 'blob' })
      .subscribe((blob) => {
        let efile = new File([blob], _file.fileName); //convert the blob into file

        this.spreadsheetObj.open({ file: efile }); // open the file into Spreadsheet
      });
  }

  public saveResult() {
    if (this.file == null) {
      return;
    }

    //Store Changes
  }
}
