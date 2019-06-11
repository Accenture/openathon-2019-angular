import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { EventService } from "./event.service";
import { UserService } from "./user.service";

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [EventService, UserService]
})
export class CoreModule {}
