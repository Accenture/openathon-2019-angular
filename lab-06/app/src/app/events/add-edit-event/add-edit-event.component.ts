import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Event } from "../../models/event";
import { User } from "../../models/user";
import { EventService } from "../../core/event.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "oevents-add-edit-event",
  templateUrl: "./add-edit-event.component.html",
  styleUrls: ["./add-edit-event.component.scss"]
})
export class AddEditEventComponent implements OnInit {
  addEditForm: FormGroup;
  event: Event;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params["id"];

    if (id) {
      this.eventService.getEvent(id).subscribe((event: Event) => {
        console.log(event);
        this.event = event;
        this.createForm();
      });
    } else {
      this.createForm();
    }
  }

  createForm() {
    if (this.event) {
      this.addEditForm = this.fb.group({
        title: this.event.title,
        location: this.event.location,
        date: this.event.date,
        description: this.event.description,
        addedBy: this.event.addedBy,
        id: this.event.id
      });
    } else {
      this.addEditForm = this.fb.group({
        title: "",
        location: "",
        date: "",
        description: "",
        addedBy: "",
        id: ""
      });
    }
  }

  onSubmit() {
    const user: User = JSON.parse(localStorage.getItem("user"));

    this.event = this.addEditForm.value;
    this.event.addedBy = user.email;

    if (this.event.id) {
      this.eventService.updateEvent(this.event).subscribe((event: Event) => {
        console.log(event);
        this.addEditForm.reset();
        this.router.navigate(["/events"]);
      });
    } else {
      this.eventService.addEvent(this.event).subscribe((event: Event) => {
        console.log(event);
        this.addEditForm.reset();
        this.router.navigate(["/events"]);
      });
    }
  }
}
