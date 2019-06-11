import { Component, OnInit, Input } from "@angular/core";
import { Event } from "../../models/event";
import { ActivatedRoute } from "@angular/router";
import { EventService } from "../../core/event.service";
import { Router } from "@angular/router";
import { ImagesService } from "../../core/images.service"


@Component({
  selector: "oevents-event-details",
  templateUrl: "./event-details.component.html",
  styleUrls: ["./event-details.component.scss"]
})
export class EventDetailsComponent implements OnInit {
  event: Event;
  imageUrl: string;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
    private imagesService: ImagesService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    this.getImage();
  }

  getImage() {
    this.imagesService.getImage().subscribe(img => {
      this.imageUrl = img.urls.small;
      this.getEvent();
    })
  }

  getEvent() {
    this.eventService.getEvent(this.id).subscribe((event: Event) => {
      console.log(event);
      this.event = event;
    });
  }

  deleteEvent(event: Event) {
    console.log(event);
    this.eventService.deleteEvent(event.id).subscribe(() => {
      console.log("Event Removed");
    });
    this.router.navigate(["/events"]);
  }
}
