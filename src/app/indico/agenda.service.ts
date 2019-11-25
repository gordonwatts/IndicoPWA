import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Url } from 'url';
import { Observable } from 'rxjs';

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
  indico_url: string;
}

@Injectable({
  providedIn: 'root'
})

export class AgendaService {

  constructor(private http: HttpClient) { }

  private parseEventCard(json : IndicoExportMeetingResponse) : MeetingNameCard[] {
    // Grab the very first item in the response
    let i1 = json.results[0]
    let title = i1.title
    let url = i1.url

    return [{
      name: title,
      indico_url: url
    }]
  }

  public getNameCard(indico_url: string) : Observable<MeetingNameCard[]> {
    // 'https://indico.cern.ch/export/event/799542.json
    let j = this.http.get(indico_url)
      .pipe(map((res: IndicoExportMeetingResponse) => this.parseEventCard(res)))
    return j
  }
}
