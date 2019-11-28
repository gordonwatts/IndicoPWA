import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MeetingListService } from '../datastore/meeting-list.service';
import { Subscription } from 'rxjs';
import { MeetingNameCard } from '../indico/agenda.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['url'];
  meetings = new MatTableDataSource<MeetingNameCard>();

  constructor(private all_meetings: MeetingListService) { }

  ngOnInit() {
    this.meetings.data = this.all_meetings.get_list();
  }
}
