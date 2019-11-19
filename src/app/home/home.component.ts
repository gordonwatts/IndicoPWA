import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MeetingId, MeetingListService } from '../datastore/meeting-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['url'];
  meetings = new MatTableDataSource<MeetingId>();

  constructor(private all_meetings: MeetingListService) { }

  ngOnInit() {
    this.all_meetings.get_list().then(r => this.meetings.data = r);
  }
}
