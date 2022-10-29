import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  DocumentEditorComponent,
  DocumentEditorContainerComponent,
  ToolbarService,
} from '@syncfusion/ej2-angular-documenteditor';

@Component({
  selector: 'app-doc-editor',
  templateUrl: './doc-editor.component.html',
  styleUrls: ['./doc-editor.component.css'],
  providers: [ToolbarService],
})
export class DocEditorComponent implements OnInit {
  @Input() FileEntity: any = {};
  @Input() Parent: any;

  constructor() {}

  ngOnInit(): void {}

  @ViewChild('document_editor')
  public documentEditorContainer: DocumentEditorContainerComponent;

  onCreated() {
    // if (this.documentEditorContainer.documentEditor.isDocumentLoaded) {
    //   this.permit.getSFDT(this.FileEntity).subscribe(r => {
    //     let m: any = r;
    //     //Open the sfdt document in Document Editor.
    //     this.documentEditorContainer.documentEditor.open(m.fileUrl);
    //   });
    // }
  }

  saveResult() {
    this.documentEditorContainer.documentEditor.saveAsBlob('Docx').then((r) => {
      console.log(r);
      const blobToBase64 = (blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise((resolve) => {
          reader.onloadend = () => {
            resolve(reader.result);
          };
        });
      };

      blobToBase64(r).then((data) => {
        this.FileEntity.editedForm = data;

        console.log(this.FileEntity);

        this.Parent.setDisableEditedForms();
      });
    });
  }

  storeResult() {}
}
