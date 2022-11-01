import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DocumentEditorModule,
  DocumentEditorContainerModule,
} from '@syncfusion/ej2-angular-documenteditor';
import { DocEditorComponent } from 'src/app/components/doc-editor/doc-editor.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DocEditorComponent,
  },
];

@NgModule({
  declarations: [DocEditorComponent],
  imports: [
    CommonModule,
    DocumentEditorModule,
    DocumentEditorContainerModule,
    RouterModule.forChild(routes),
  ],
})
export class DocModule {}
