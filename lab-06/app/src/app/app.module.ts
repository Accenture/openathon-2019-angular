import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Modules
import { CoreModule } from "./core/core.module";
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";

import { EventsModule } from "./events/events.module";
import { LoginModule } from "./login/login.module";
import { ProfileModule } from "./profile/profile.module";

// State Management
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.store';
import { EffectsModule } from '@ngrx/effects';
import { LayoutEffects } from './store/layout/layout.effects';

// Components
import { AppComponent } from "./app.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ToolbarComponent,
    PageNotFoundComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    EventsModule,
    LoginModule,
    ProfileModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([LayoutEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
