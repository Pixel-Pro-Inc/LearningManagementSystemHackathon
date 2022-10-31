import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private shared: SharedService) {}

  getMessages(participants: any) {
    return this.shared.http.post(
      this.shared.baseUrl + 'message/getmessages',
      participants
    );
  }

  sendMessage(model: any) {
    return this.shared.http.post(this.shared.baseUrl + 'message/send', model);
  }

  getChannelID(participants: any) {
    return this.shared.http.post(
      this.shared.baseUrl + 'message/getchannelid',
      participants
    );
  }

  closeMessageChannel(channelID: string) {
    return this.shared.http.get(
      this.shared.baseUrl + 'message/closechannelid/' + channelID
    );
  }
}
