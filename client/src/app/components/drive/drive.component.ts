import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DriveService } from 'src/app/_services/drive.service';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.css'],
})
export class DriveComponent implements OnInit {
  docSearchForm: FormGroup;
  createFolderForm: FormGroup;
  createFileForm: FormGroup;
  lastDirectory: any = [];
  currentDirectory: string = 'My Drive/';

  folderColumns: any = [];
  fileColumns: any = [];

  displayFolders: any = [];
  displayFiles: any = [];

  folders: any = [];
  files: any = [];

  fileUrl: string = '';
  constructor(
    private fb: FormBuilder,
    public shared: SharedService,
    private driveService: DriveService
  ) {}

  initializeForm() {
    this.docSearchForm = this.fb.group({
      document: ['', []],
    });

    this.createFolderForm = this.fb.group({
      folderName: ['', [Validators.required]],
    });

    this.createFileForm = this.fb.group({
      fileName: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.initializeForm();
    this.updateDrive();
  }

  toggleModal(id: string) {
    let doc = document.getElementById('modalParent');
    doc.classList.toggle('close');

    doc = document.getElementById(id);
    doc.classList.toggle('close');
  }

  createFolder() {
    let model: any = {
      owner: this.shared.getUser(),
      directory: this.currentDirectory,
      folderName: this.createFolderForm.controls.folderName.value,
    };

    this.createFolderForm.controls.folderName.setValue('');

    this.toggleModal('newFolder');

    this.driveService.createFolder(model).subscribe(
      (response) => {
        this.updateDrive();
      },
      (error) => {
        this.shared.toastr.error(error.error);
      }
    );
  }

  createFile() {
    if (this.fileUrl == '') {
      this.shared.toastr.error('Select a file first.');
      return;
    }

    let model: any = {
      owner: this.shared.getUser(),
      directory: this.currentDirectory,
      fileName: this.createFileForm.controls.fileName.value,
      fileUrl: this.fileUrl,
    };

    let doc = <HTMLInputElement>document.getElementById('file_input');
    doc.value = '';

    this.createFileForm.controls.fileName.setValue('');

    this.toggleModal('newFile');

    this.driveService.createFile(model).subscribe(
      (response) => {
        this.fileUrl = '';
        this.updateDrive();
      },
      (error) => {
        this.shared.toastr.error(error.error);
      }
    );
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.fileUrl = reader.result as string;
      };
    }
  }

  navigateBack() {
    if (this.currentDirectory == 'My Drive/') {
      return;
    }

    this.currentDirectory = this.lastDirectory[this.lastDirectory.length - 1];
    this.lastDirectory.pop(this.lastDirectory.length - 1);
    this.updateDrive();
  }

  updateDrive() {
    this.folderColumns = [];
    this.fileColumns = [];

    this.displayFolders = [];
    this.displayFiles = [];

    this.folders = [];
    this.files = [];
    this.populateFolders();
    this.populateFiles();
  }

  populateFolders() {
    this.driveService.getFolders(this.shared.getUser()).subscribe(
      (response) => {
        this.folders = response;
        this.displayFoldersByDir();
      },
      (error) => {
        this.shared.toastr.error(error.error);
      }
    );
  }

  populateFiles() {
    this.driveService.getFiles(this.shared.getUser()).subscribe(
      (response) => {
        this.files = response;
        this.displayFilesByDir();
      },
      (error) => {
        this.shared.toastr.error(error.error);
      }
    );
  }

  displayFoldersByDir() {
    this.displayFolders = [];
    this.folderColumns = [];

    this.folders.forEach((folder) => {
      if (folder.directory == this.currentDirectory) {
        this.displayFolders.push(folder);
      }
    });

    // for (let i = 1; i < this.displayFolders.length; i + 3) {
    //   if (this.folderColumns.length < 3) {
    //     this.folderColumns.push([]);
    //   }

    //   if (i - 1 < this.displayFolders.length) {
    //     this.folderColumns[this.folderColumns.length - 1].push(
    //       this.displayFolders[i - 1]
    //     );
    //   }
    //   if (i < this.displayFolders.length) {
    //     this.folderColumns[this.folderColumns.length - 1].push(
    //       this.displayFolders[i]
    //     );
    //   }
    //   if (i + 1 < this.displayFolders.length) {
    //     this.folderColumns[this.folderColumns.length - 1].push(
    //       this.displayFolders[i + 1]
    //     );
    //   }
    // }
  }

  displayFilesByDir() {
    this.displayFiles = [];
    this.fileColumns = [];

    this.files.forEach((file) => {
      if (file.directory == this.currentDirectory) {
        this.displayFiles.push(file);
      }
    });

    // for (let i = 1; i < this.displayFiles.length; i + 3) {
    //   if (this.fileColumns.length < 3) {
    //     this.fileColumns.push([]);
    //   }

    //   if (i - 1 < this.displayFiles.length) {
    //     this.fileColumns[this.fileColumns.length - 1].push(
    //       this.displayFiles[i - 1]
    //     );
    //   }
    //   if (i < this.displayFiles.length) {
    //     this.fileColumns[this.fileColumns.length - 1].push(
    //       this.displayFiles[i]
    //     );
    //   }
    //   if (i + 1 < this.displayFiles.length) {
    //     this.fileColumns[this.fileColumns.length - 1].push(
    //       this.displayFiles[i + 1]
    //     );
    //   }
    // }
  }

  openFolder(folderName: string) {
    this.lastDirectory.push(this.currentDirectory);

    this.currentDirectory += folderName + '/';

    this.displayFoldersByDir();
    this.displayFilesByDir();
  }

  deleteFolder(folder: any) {
    this.driveService.deleteFolder(folder).subscribe(
      (response) => {
        this.updateDrive();
      },
      (error) => {
        this.shared.toastr.error(error.error);
      }
    );
  }

  downloadFile(fileUrl: string) {
    window.open(fileUrl, '_blank');
  }

  deleteFile(file: any) {
    this.driveService.deleteFile(file).subscribe(
      (response) => {
        this.updateDrive();
      },
      (error) => {
        this.shared.toastr.error(error.error);
      }
    );
  }

  sidebarToggle() {
    let sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
  }

  searchDoc() {}
}
