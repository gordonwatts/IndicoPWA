import { TestBed } from '@angular/core/testing';

import { UrlCleaningService } from './url-cleaning.service';

describe('UrlCleaningService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UrlCleaningService = TestBed.get(UrlCleaningService);
    expect(service).toBeTruthy();
  });

  it('CERN site returns itself', () => {
    const service: UrlCleaningService = TestBed.get(UrlCleaningService);
    let actual = service.get_canonical_url("https://indico.cern.ch/event/799542/");
    expect(actual.stub).toEqual("https://indico.cern.ch");
    expect(actual.event_id).toEqual('799542');
  });

  it('CERN site returns itself no trailing slash', () => {
    const service: UrlCleaningService = TestBed.get(UrlCleaningService);
    let actual = service.get_canonical_url("https://indico.cern.ch/event/799542");
    expect(actual.stub).toEqual("https://indico.cern.ch");
    expect(actual.event_id).toEqual("799542");
  });

  it('CERN site Export Returns event', () => {
    const service: UrlCleaningService = TestBed.get(UrlCleaningService);
    let actual = service.get_canonical_url("https://indico.cern.ch/export/event/799542.json");
    expect(actual.stub).toEqual("https://indico.cern.ch");
    expect(actual.event_id).toEqual("799542");
  });
  
  it('CERN site contribution', () => {
    const service: UrlCleaningService = TestBed.get(UrlCleaningService);
    let actual = service.get_canonical_url("https://indico.cern.ch/event/799542/contributions/3489878/");
    expect(actual.stub).toEqual("https://indico.cern.ch");
    expect(actual.event_id).toEqual("799542");
  });

  it('Site Down a Level', () => {
    const service: UrlCleaningService = TestBed.get(UrlCleaningService);
    let actual = service.get_canonical_url("https://indico.cern.ch/subdir/event/799542/contributions/3489878/");
    expect(actual.stub).toEqual("https://indico.cern.ch/subdir");
    expect(actual.event_id).toEqual("799542");
  });

  it('non-indico site', () => {
    const service: UrlCleaningService = TestBed.get(UrlCleaningService);
    let actual = service.get_canonical_url("https://nytimes.com");
    expect(actual).toEqual(null);
  });
});
