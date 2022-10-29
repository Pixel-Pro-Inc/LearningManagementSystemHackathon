import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private shared: SharedService) { }

  getMessageThread(receipient: any){
    return this.shared.http.get(this.shared.baseUrl + 'message/messages/thread/' + this.shared.getUser().email + '/' + receipient);
  }

  sendMessage(model: any){
    return this.shared.http.post(this.shared.baseUrl + 'message/messages/createmessage', model);
  }
}
