import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IndicoPWA';
  addMeetingURLForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.addMeetingURLForm = this.formBuilder.group({
      search: ['', Validators.required],
    });
  }

  onSearch() {
    if (!this.addMeetingURLForm.valid) return;
    // this.router.navigate(['search'], { queryParams: {query: this.addMeetingURLForm.get('meetingURL').value}});
  }
}