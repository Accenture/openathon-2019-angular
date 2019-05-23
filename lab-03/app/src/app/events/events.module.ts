import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

//Modules
import { SharedModule } from "../shared/shared.module";

// Components
import { EventListComponent } from "./event-list/event-list.component";
import { EventDetailsComponent } from "./event-details/event-details.component";

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [EventListComponent, EventDetailsComponent]
})
export class EventsModule {}
