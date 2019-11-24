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

  _all_meetings = new Set<MeetingNameCard>();

  add_meeting(m_card: MeetingNameCard) {
    this._all_meetings.add(m_card);
    console.log(this._all_meetings.size);
  }

  async get_list() : Promise<MeetingNameCard[]>
  {
    return [...this._all_meetings];
  }
}
