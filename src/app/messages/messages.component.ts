import { Component, OnInit } from '@angular/core';

import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

	// a reason to be a public - messageService property is binded to template
	constructor(public messageService: MessageService) { }

	ngOnInit() {
	}

}
