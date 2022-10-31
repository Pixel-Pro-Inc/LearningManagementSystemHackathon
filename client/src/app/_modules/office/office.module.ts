import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DocumentEditorModule,
  DocumentEditorContainerModule,
} from '@syncfusion/ej2-angular-documenteditor';
import { PdfViewerModule } from '@syncfusion/ej2-angular-pdfviewer';
import { SpreadsheetModule } from '@syncfusion/ej2-angular-spreadsheet';
import { DocEditorComponent } from 'src/app/components/doc-editor/doc-editor.component';
import { ExcelComponent } from 'src/app/components/excel/excel.component';
import { PdfComponent } from 'src/app/components/pdf/pdf.component';

@NgModule({
  declarations: [DocEditorComponent, ExcelComponent, PdfComponent],
  imports: [
    CommonModule,
    DocumentEditorModule,
    DocumentEditorContainerModule,
    SpreadsheetModule,
    PdfViewerModule,
  ],
})
export class OfficeModule {}
