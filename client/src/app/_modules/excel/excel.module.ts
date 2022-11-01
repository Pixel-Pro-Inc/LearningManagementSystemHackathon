import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpreadsheetModule } from '@syncfusion/ej2-angular-spreadsheet';
import { ExcelComponent } from 'src/app/components/excel/excel.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ExcelComponent,
  },
];

@NgModule({
  declarations: [ExcelComponent],
  imports: [CommonModule, SpreadsheetModule, RouterModule.forChild(routes)],
})
export class ExcelModule {}
