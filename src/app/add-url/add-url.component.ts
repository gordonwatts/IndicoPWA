import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-url',
  templateUrl: './add-url.component.html',
  styleUrls: ['./add-url.component.css']
})
export class AddURLComponent implements OnInit {
  addMeetingURLForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router) {
  }

  ngOnInit() {
    this.addMeetingURLForm = this.formBuilder.group({
      addURL: ['', Validators.required],
    });
  }

  onAddURL() {
    if (!this.addMeetingURLForm.valid) return;
    console.log(this.addMeetingURLForm.get('addURL').value)
    this.router.navigate(['']);
    // this.router.navigate(['search'], { queryParams: {query: this.addMeetingURLForm.get('meetingURL').value}});
  }

}
