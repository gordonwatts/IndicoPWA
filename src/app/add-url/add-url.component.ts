import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AgendaService, MeetingNameCard } from '../indico/agenda.service';
import { MatTableDataSource } from '@angular/material';
import { MeetingListService } from '../datastore/meeting-list.service';

@Component({
  selector: 'app-add-url',
  templateUrl: './add-url.component.html',
  styleUrls: ['./add-url.component.css']
})
export class AddURLComponent implements OnInit {
  addMeetingURLForm: FormGroup;

  displayedColumns: string[] = ['title', 'add'];
  meetings = new MatTableDataSource<MeetingNameCard>();

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private agenda: AgendaService,
    private all_meetings: MeetingListService
    ) {
  }

  ngOnInit() {
    this.addMeetingURLForm = this.formBuilder.group({
      addURL: ['', Validators.required],
    });
  }

  onAddURL() {
    if (!this.addMeetingURLForm.valid) return;
    let info = this.agenda.getNameCard(this.addMeetingURLForm.get('addURL').value)
      .subscribe(r => this.meetings.data = r)
    //this.router.navigate(['']);
    // this.router.navigate(['search'], { queryParams: {query: this.addMeetingURLForm.get('meetingURL').value}});
  }

  onAddThisMeeting(card: MeetingNameCard) {
    this.all_meetings.add_meeting(card);
  }

}
