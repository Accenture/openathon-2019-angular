import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

//Modules
import { SharedModule } from "../shared/shared.module";

// Components
import { EventListComponent } from "./event-list/event-list.component";
import { EventDetailsComponent } from "./event-details/event-details.component";
import { AddEditFormComponent } from './add-edit-form/add-edit-form.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [EventListComponent, EventDetailsComponent, AddEditFormComponent]
})
export class EventsModule {}
