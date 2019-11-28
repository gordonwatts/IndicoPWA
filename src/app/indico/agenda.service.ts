import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Url } from 'url';
import { Observable } from 'rxjs';
import { ParsedMeetingURL } from './url-cleaning.service';

interface RawIndicoMeeting {
  id: number;
  title: string;
  url: string;
}

interface IndicoExportMeetingResponse {
  results: RawIndicoMeeting[]    
}

export interface MeetingNameCard {
  // Full display name of the meeting
  name: string;

  // Indico URL to get to the event.
  indico_url: ParsedMeetingURL;
}

@Injectable({
  providedIn: 'root'
})

export class AgendaService {

  constructor(private http: HttpClient) { }

  private parseEventCard(json : IndicoExportMeetingResponse, indico_url: ParsedMeetingURL) : MeetingNameCard[] {
    // Grab the very first item in the response
    let i1 = json.results[0]
    let title = i1.title

    return [{
      name: title,
      indico_url: indico_url
    }]
  }

  public getNameCard(indico_url: ParsedMeetingURL) : Observable<MeetingNameCard[]> {
    let url = `${indico_url.stub}/export/event/${indico_url.event_id}.json`;
    let j = this.http.get(url)
      .pipe(map((res: IndicoExportMeetingResponse) => this.parseEventCard(res, indico_url)))
    return j
  }
}
