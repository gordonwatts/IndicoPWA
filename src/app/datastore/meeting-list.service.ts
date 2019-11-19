import { Injectable } from '@angular/core';

export class MeetingId {
  indico_url: string;
}

@Injectable({
  providedIn: 'root'
})
export class MeetingListService {
  constructor() { }

  all_meetings = new Set<MeetingId>();

  add_meeting(url: string) {
    this.all_meetings.add({indico_url: url});
    console.log(this.all_meetings.size);
  }

  async get_list() : Promise<MeetingId[]>
  {
    return [...this.all_meetings];
  }
}
