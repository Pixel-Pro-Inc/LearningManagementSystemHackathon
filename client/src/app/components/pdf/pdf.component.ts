import { Component, Input, OnInit } from '@angular/core';
import {
  LinkAnnotationService,
  BookmarkViewService,
  MagnificationService,
  ThumbnailViewService,
  ToolbarService,
  NavigationService,
  AnnotationService,
  TextSearchService,
  TextSelectionService,
  PrintService,
} from '@syncfusion/ej2-angular-pdfviewer';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css'],
  providers: [
    LinkAnnotationService,
    BookmarkViewService,
    MagnificationService,
    ThumbnailViewService,
    ToolbarService,
    NavigationService,
    AnnotationService,
    TextSearchService,
    TextSelectionService,
    PrintService,
  ],
})
export class PdfComponent implements OnInit {
  public service =
    'https://ej2services.syncfusion.com/production/web-services/api/pdfviewer';

  constructor(private shared: SharedService) {}

  ngOnInit(): void {}

  public loadPDF(_document: string) {
    this.shared.http
      .get(_document, { responseType: 'blob' })
      .subscribe((blob) => {
        const reader = new FileReader();
        const binaryString = reader.readAsDataURL(blob);
        reader.onload = (event: any) => {
          // Typecast the HTMLElement to avoid Typescript lint issue
          var pdfviewer = (<any>document.getElementById('pdfViewer'))
            .ej2_instances[0];
          //  load the base64 string
          console.log(event.target.result);
          pdfviewer.load(event.target.result, null);
        };
      });
  }
}
