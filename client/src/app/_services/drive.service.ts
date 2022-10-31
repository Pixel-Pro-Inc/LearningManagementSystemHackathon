import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class DriveService {
  constructor(private shared: SharedService) {}

  getFolders(model: any) {
    return this.shared.http.post(
      this.shared.baseUrl + 'drive/folder/retrieve',
      model
    );
  }

  createFolder(model: any) {
    return this.shared.http.post(
      this.shared.baseUrl + 'drive/folder/create',
      model
    );
  }

  deleteFolder(model: any) {
    return this.shared.http.post(
      this.shared.baseUrl + 'drive/folder/delete',
      model
    );
  }

  getFiles(model: any) {
    return this.shared.http.post(
      this.shared.baseUrl + 'drive/file/retrieve',
      model
    );
  }

  editFile(model: any) {
    return this.shared.http.post(
      this.shared.baseUrl + 'drive/file/edit',
      model
    );
  }

  getDocuments(model: any) {
    return this.shared.http.post(
      this.shared.baseUrl + 'drive/document/retrieve',
      model
    );
  }

  getSFDT(model: any) {
    return this.shared.http.post(
      this.shared.baseUrl + 'drive/sfdt/retrieve',
      model
    );
  }

  createFile(model: any) {
    return this.shared.http.post(
      this.shared.baseUrl + 'drive/file/create',
      model
    );
  }

  deleteFile(model: any) {
    return this.shared.http.post(
      this.shared.baseUrl + 'drive/file/delete',
      model
    );
  }
}
