import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from '@syncfusion/ej2-angular-pdfviewer';
import { PdfComponent } from 'src/app/components/pdf/pdf.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PdfComponent,
  },
];

@NgModule({
  declarations: [PdfComponent],
  imports: [CommonModule, PdfViewerModule, RouterModule.forChild(routes)],
})
export class PdfModule {}
