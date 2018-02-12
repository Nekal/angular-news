import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  moduleId: module.id,
  selector: 'app-messages',
  templateUrl: 'messages-form.component.html',
  styleUrls: ['messages-form.component.css']
})

export class MessagesFormComponent implements OnInit {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
  ngOnInit() {}
}
