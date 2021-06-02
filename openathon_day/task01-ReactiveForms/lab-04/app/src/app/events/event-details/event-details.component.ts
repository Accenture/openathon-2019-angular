import { Component, OnInit, Input } from "@angular/core";
import { Event } from "../../models/event";

@Component({
  selector: "oevents-event-details",
  templateUrl: "./event-details.component.html",
  styleUrls: ["./event-details.component.scss"]
})
export class EventDetailsComponent implements OnInit {
  @Input()
  event: Event;

  constructor() {}

  ngOnInit() {}
}
