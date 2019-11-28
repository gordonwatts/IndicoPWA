import { Injectable } from '@angular/core';
import { ConstantPool } from '@angular/compiler';

export interface ParsedMeetingURL {
  // Contains the info for the meeting

  // The stub where indico is located - http://indico.cern.ch, for example.
  stub: string;

  // event number
  event_id: string;
}

@Injectable({
  providedIn: 'root'
})

export class UrlCleaningService {

  constructor() { }

  // Return a URL that represents a meeting, as best we can.
  // This does not go a network check - this is purely syntax.
  // The indico url looks like 'https://node/x/y/z/event/xxxx/blah' where
  // x,y, and z might be sub-directories. And z could be export. Everything after
  // blah doesn't matter.
  // If we can't figure out the url then we return it.
  public get_canonical_url(url_string: string) : ParsedMeetingURL {
    let url = new URL(url_string);

    // Find the 'event' string to figure out where we are looking.
    // If there is no event, then we will have to bail.
    let path_components = url.pathname.split('/').filter(c => c.length > 0);

    let event_index = path_components.indexOf('event');
    if (event_index < 0) {
      return null;
    }

    // If the previous guy is "export", then we drop that.
    if (event_index != 0 && path_components[event_index-1] === "export") {
      path_components.splice(event_index-1, 1);
      event_index = event_index - 1;
    }

    // Drop everything after the event ID.
    if (path_components.length > event_index+2) {
      path_components.splice(event_index+2, path_components.length - event_index - 2);
    }

    // Now, if the event ID is anything funny, fix it up.
    let event_id = path_components[path_components.length-1];
    let dot_index = event_id.indexOf('.');
    if (dot_index >= 0) {
      path_components[path_components.length-1] = event_id.substring(0, dot_index);
    }

    // Build the result
    event_id = path_components[path_components.length-1];
    path_components = path_components.splice(0, path_components.length-2);
    if (path_components.length == 0) {
      url.pathname = '';
    } else {
      url.pathname = path_components.join('/');
    }
    let url_path = url.toString();
    if (url_path[url_path.length-1] == '/') {
      url_path = url_path.substring(0, url_path.length-1);
    }
    return {
      stub: url_path,
      event_id: event_id
    };
  }
}
