import { Injectable } from '@angular/core';
import { MeetingNameCard } from '../indico/agenda.service';

export class MeetingId {
  indico_url: string;
}

@Injectable({
  providedIn: 'root'
})
export class MeetingListService {
  // Hold the master list of all meetings we are tracking, using, etc.
  // TODO: figure out what the norms are for ts and member variables (style guide).
  //       Is there anything that will automatically lint?
  constructor() { }

  private get_meeting_list() {
    let s = localStorage.getItem('meeting_list');
    return (s === null || s === "{}") ? new Set<MeetingNameCard>() : new Set<MeetingNameCard>(JSON.parse(s));
  }

  private set_meeting_list(meeting_list : Set<MeetingNameCard>) {
    localStorage.setItem('meeting_list', JSON.stringify([...meeting_list]));
  }

  public add_meeting(m_card: MeetingNameCard) {
    let all_meetings = this.get_meeting_list()
    all_meetings.add(m_card);
    this.set_meeting_list(all_meetings)
    console.log(all_meetings.size);
  }

  public get_list() : MeetingNameCard[]
  {
    let l = this.get_meeting_list()
    return [...l];
  }
}
