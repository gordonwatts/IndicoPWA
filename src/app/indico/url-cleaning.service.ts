import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlCleaningService {

  constructor() { }

  // Return a URL that represents a meeting, as best we can.
  // This does not go a network check - this is purely syntax.
  public get_canonical_url(url: string) : string {
    return url;
  }
}
