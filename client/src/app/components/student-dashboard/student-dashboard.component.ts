import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Schedule } from '@syncfusion/ej2-angular-schedule';
import Pusher from 'pusher-js';
import { AccountService } from 'src/app/_services/account.service';
import { DashboardService } from 'src/app/_services/dashboard.service';
import { MessageService } from 'src/app/_services/message.service';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'],
})
export class StudentDashboardComponent implements OnInit {
  messageForm: FormGroup;
  userSearchForm: FormGroup;
  user: any;

  usersList: any = [];

  msgChannels: any = [];
  msgChannelIds: any = [];
  messages: any = [];

  announcements: any = [];

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private messageService: MessageService,
    public shared: SharedService,
    private dashboardService: DashboardService
  ) {}

  initializeForm() {
    this.messageForm = this.fb.group({
      content: ['', []],
    });

    this.userSearchForm = this.fb.group({
      username: ['', []],
    });
  }

  ngOnInit(): void {
    this.user = this.shared.getUser();

    this.initializeForm();
    this.populateUsersList();
    this.populateAnnouncements();
  }

  populateAnnouncements() {
    this.dashboardService.getAnnouncements(this.shared.getUser()).subscribe(
      (response) => {
        this.announcements = response;

        let archived = JSON.parse(localStorage.getItem('archived'));

        if (archived == null) {
          archived = [];
        }

        archived.forEach((element) => {
          this.announcements.forEach((ant) => {
            if (element.id == ant.id) {
              this.announcements[this.announcements.indexOf(ant)] = element;
            }
          });
        });
      },
      (error) => {
        this.shared.toastr.error(error.error);
      }
    );
  }

  Archive(announcement: any) {
    let archived = JSON.parse(localStorage.getItem('archived'));

    if (archived == null) {
      archived = [];
    }

    announcement.archived = true;

    archived.push(announcement);

    localStorage.setItem('archived', JSON.stringify(archived));
  }

  pusherInit(channelIndex: number, _channelID) {
    //Pusher Init
    Pusher.logToConsole = true;

    var pusher = new Pusher('50543c871b4d08fed31e', {
      cluster: 'us2',
    });

    let channelID =
      _channelID == null
        ? Date.now() + '_' + channelIndex
        : _channelID.channelId;

    this.msgChannelIds[this.messages.length - 1].push(channelID);

    var channel = pusher.subscribe(channelID);

    channel.bind('message', (data) => {
      this.displayMessage(data);
    });
  }

  displayMessage(data) {
    this.messages[
      data.messageChannel.charAt(data.messageChannel.length - 1)
    ].push(data);
  }

  isObject(o) {
    return o !== null && typeof o === 'object';
  }

  isArray(o) {
    return false; //o.isArray();
  }

  populateUsersList() {
    this.accountService.getAllUsers().subscribe(
      (response) => {
        let users: any = response;

        this.usersList = [];

        users.forEach((element) => {
          if (element.organizationId != this.shared.getUser().organizationId) {
            this.usersList.push(element);
          }
        });
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

  sendMessage(channel: number) {
    let _userIds: any = [];
    this.msgChannels[channel].forEach((element) => {
      _userIds.push(element.organizationId);
    });

    let message: any = {
      senderId: this.shared.getUser().organizationId,
      recipientIds: _userIds,
      content: this.messageForm.controls.content.value,
      messageChannel: this.msgChannelIds[channel][0],
    };

    this.messageForm.controls.content.setValue('');

    this.messageService.sendMessage(message).subscribe(
      (response) => {
        /*Sent*/
      },
      (error) => {
        this.shared.toastr.error(error.error);
      }
    );
  }

  startChat(user) {
    if (this.msgChannels.length > 0) {
      this.shared.toastr.error('You can only open one chat at a time.');
      return;
    }

    let users: any = [];
    users.push(user);

    user.selected = true;

    this.createMsgChannel(users);
  }

  createMsgChannel(users: any) {
    this.msgChannels.push([]);
    this.msgChannelIds.push([]);
    this.messages.push([]);

    let participants: any = [];

    users.forEach((element) => {
      this.msgChannels[this.messages.length - 1].push(element);
      participants.push(element.organizationId);
    });

    participants.push(this.shared.getUser().organizationId);

    let model: any = {};

    model.participantsIds = participants;

    this.messageService.getMessages(model).subscribe(
      (response) => {
        let _messages: any = response;
        _messages.forEach((element) => {
          this.messages[this.messages.length - 1].push(element);
        });
      },
      (error) => {
        this.shared.toastr.error(error.error);
      }
    );

    let channelID = null;

    this.messageService.getChannelID(model).subscribe(
      (response) => {
        if (response != null) {
          channelID = response;
        }

        this.pusherInit(this.messages.length - 1, channelID);
      },
      (error) => {
        this.shared.toastr.error(error.error);
      }
    );
  }

  closeMsgChannel(channel: number) {
    this.msgChannels[channel].forEach((element) => {
      element.selected = false;
    });
    this.msgChannels.pop(channel);
    this.messages.pop(channel);
    this.msgChannelIds.pop(channel);
  }

  searchUser() {}
}
