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

  private get_meeting_list(): MeetingNameCard[] {
    let s = localStorage.getItem('meeting_list');
    return (s === null || s === "{}") ? [] : this.clean_list(JSON.parse(s));
  }

  private set_meeting_list(meeting_list : MeetingNameCard[]) {
    localStorage.setItem('meeting_list', JSON.stringify(meeting_list));
  }

  private clean_list(m_list: MeetingNameCard[]) : MeetingNameCard[] {
    let r = new Map<string, MeetingNameCard>();
    m_list.forEach(m => {
         r.set(m.indico_url, m);
    });
    return Array.from(r.values());
  }

  public add_meeting(m_card: MeetingNameCard) {
    let all_meetings = this.get_meeting_list();
    all_meetings.push(m_card);
    this.set_meeting_list(all_meetings)
  }

  public get_list() : MeetingNameCard[]
  {
    return this.get_meeting_list();
  }
}
