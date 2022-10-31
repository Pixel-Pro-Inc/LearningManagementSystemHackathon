import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  DocumentEditorComponent,
  DocumentEditorContainer,
  DocumentEditorContainerComponent,
  ToolbarService,
} from '@syncfusion/ej2-angular-documenteditor';
import { DriveService } from 'src/app/_services/drive.service';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-doc-editor',
  templateUrl: './doc-editor.component.html',
  styleUrls: ['./doc-editor.component.css'],
  providers: [ToolbarService],
})
export class DocEditorComponent implements OnInit {
  constructor(
    private driveService: DriveService,
    private shared: SharedService
  ) {}

  ngOnInit(): void {}

  @ViewChild('document_editor')
  public documentEditorContainer: DocumentEditorContainerComponent;

  file: any = null;

  onCreated() {
    this.documentEditorContainer.toolbar.enableItems(0, false);
    this.documentEditorContainer.toolbar.enableItems(1, false);
  }

  public loadDoc(_file: any) {
    this.file = _file;

    if (this.documentEditorContainer.documentEditor.isDocumentLoaded) {
      this.driveService.getSFDT(_file).subscribe((r) => {
        let m: any = r;
        //Open the sfdt document in Document Editor.
        this.documentEditorContainer.documentEditor.open(m.fileUrl);
      });
    }
  }

  public saveResult() {
    if (this.file == null) {
      return;
    }

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
        this.file.fileUrl = data;

        this.driveService.editFile(this.file).subscribe(
          (response) => {
            this.shared.toastr.success('Changes saved');
          },
          (error) => {
            this.shared.toastr.error(error.error);
          }
        );
      });
    });
  }

  storeResult() {}
}
