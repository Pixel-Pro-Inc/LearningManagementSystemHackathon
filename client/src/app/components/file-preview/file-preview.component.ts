import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.css'],
})
export class FilePreviewComponent implements OnInit {
  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {}

  isTeacher() {
    return (
      this.sharedService.getUser().accountType ==
      this.sharedService.AccountTypes.Teacher
    );
  }

  openUrl(url: string) {
    window.open(url, '_blank');
  }
}
