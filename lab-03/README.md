<p align="center">
    <img src="../boring-theory-1/resources/header.png">
</p>

# Lab 03 - Routing Basics
## Objectives and Outcomes
In this lab we will transform our application from a component-based navigation to a routing-based navigation. This feature will make the app more web-like adding other goodness:

* We will have a URL for each view. 
* It will allow us to navigate back and forth (navigation history).
* It will allow to manage advanced features like URL parameters, child views, route guards...

Actually, the app is a SPA (Single Page Application) therefore there isn't a real change to the URL. Like a desktop app, the whole life of a SPA happens in one view-page. As we said, what we will do is to bring the SPA closer to the web world providing different routes per page.


## A new folder structure

In order to do this, we are going to change the folder structure following the <a href="https://angular.io/guide/styleguide#style-04-07">best practices</a> splitting folders by major features. 

On the other hand, we need take care of application scalability preparing it to hold a large number of components and different functionalities but without overengineering (remember *KIS! Keep It Simple*).

We are going to do this adding a new module for each major feature in order to atomize the app and to facilitate the possible addition of new components.

## Feature Modules

We are going to consider three major features: events, profile and login, therefore we'll create three folders with three different modules. These modules are named "Feature Modules" because they manage features. Also, they will have to be imported by the main app module.

Add the new folders/modules like this:

```sh
ng g module events
ng g module profile
ng g module login
```

> **_Side Note:_**  How do you decide what feature is a major feature candidate to host a Feature Module? It depends. Sometimes it's clear since the feature is a main feature (as "events") and sometimes you think that a feature will grow a lot in the future... In this case, we can argue about the need of Feature Modules in "login" and "profile" features, but we will include them for the sake of the example.

Now we have to move the events components to the events folder because this will be their correct location in our new structure, so move "event-list" and "event-details" to "events" folder. We have to modify some import paths to consider the new location of those files. In "event-list.component.ts" and "event-details.component.ts" files we need to change the import sentence from "../models/event" to "../../models/event" to reflect the correct location.

Also, we need to modify the import paths in app-module.ts where the components are registered, but instead of doing it, we are going to introduce a new feature very common in an Angular app: the Shared Module.

## Shared Module

The Shared Module is a module where we are going to put all other common features that we could share with other parts of the app. This will help us to order and manage common elements easily. A good example is the Angular Material components that will be inserted in different parts of the app, this way we don't have to import them in each feature module and only the Shared Module will be imported where we need them.

First, we are going to create a folder named "shared" and a new module shared.module.ts inside. To do this in one step we need to execute:

```sh
ng g module shared
```

> **_Side Note:_**  You can see some best practices about the Shared Module in https://angular.io/guide/styleguide#shared-feature-module

The new created module must look like next:

```javascript
import { NgModule } from "@angular/core";

//Angular material
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import "hammerjs";

@NgModule({
  declarations: [],
  imports: [
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatCardModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatCardModule
  ],
  entryComponents: []
})
export class SharedModule {}
```

Now, we will modify the "app.module.ts" and the "events.module.ts" for ordering the new composition of our app.

For app.module.ts:

```javascript
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Modules
import { SharedModule } from "./shared/shared.module";
import { EventsModule } from "./events/events.module";
import { LoginModule } from "./login/login.module";
import { ProfileModule } from "./profile/profile.module";

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
    BrowserModule,
    SharedModule,
    EventsModule,
    LoginModule,
    ProfileModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

For events.module.ts:

```javascript
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
```

As you can see, the events module has their own components, the app module has the minimum necessary and the shared module have the shared components. 

Look at this last module: we need to "export" the components that other modules will need. Look at "events" and "app" modules: you can see that we import the shared module because we need them in some components, which are part of the shared module. In this case, those components are from Angular Material, but we could have our own components or other Angular features (pipes, services, directives...).

## Basic Routing

Now we have an app for a more real case ready for better scalability and well structured. It's time to do the last step for having an enterprise-ready app... or almost.

The Angular Router we will use is not part of Angular Core module (where we are importing some core modules like ngModule or BrowserModule), so we need to import required modules from "@angular/router". This RouterModule have to be imported by the main module (app.module.ts). In order to do it more realistic and taking into account a future rise of the URL number to manage, we are going to make a separated file to manage the routing. It will be imported by app.module.ts allowing us to see more clearly what is happening.

We will create a new file named "app-routing.module.ts" in the app folder with next content:

```javascript
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LandingPageComponent } from "./landing-page/landing-page.component";
import { EventListComponent } from "./events/event-list/event-list.component";
import { ProfileComponent } from "./profile/profile.component";
import { LoginComponent } from "./login/login.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: "home", component: LandingPageComponent },
  { path: "events", component: EventListComponent },
  { path: "profile", component: ProfileComponent },
  { path: "login", component: LoginComponent },

  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```
We are going to see what happens inside: because this is a module (for routing), we need to import ngModule to annotate it properly. Also, we need the required modules for routing "Routes, RouterModule". After that, we need to import the components that will be activated when a URL will be invoked (these components aren't still created).

Now, the interesting part. We define a constant typed as "Routes" (imported before) to be sure the format we write it is correct. This format consists on an array of objects. Each object has "path" and "component" properties. The first object says "if the URL will be /home, please activate the LandingPageComponent component", the LandingPageComponent controller (landing-page.component.ts) and view (landing-page.component.html) will take action.

Also, we have configured a "Not found" page (a new component that you can make to practice) and an empty path a little different than others. This object is saying "when in the URL we don't have any path, we activate the home page".  For example, if we have a domain www.mypage.com if we are navigating to this root path ("/") www.mypage.com, the app redirects us to www.mypage.com/home in order to show the main page (or whatever we want).

> **_Side Note:_**  Remember to create your "Not Found" component.

The last step will be to import the routes, register them in the RouterModule and export it because, as we know, we need to import it in the main app.module.ts.

Add this import in app.module.ts:

```javascript
import { AppRoutingModule } from "./app-routing.module";
```

and in the imports array:

```javascript
  imports: [
    BrowserModule,
    AppRoutingModule, <---- NEW
    SharedModule,
    EventsModule,
    LoginModule,
    ProfileModule
  ],
  ```

  > **_Side Note:_**  The order of the imports matters. You have to import first the modules used by other modules at the bottom of the list.


When a component is activated using their path, where can we see its html view? The response is a new element (directive) named `Router Outlet` that will indicate in the html where the new component will be shown. To do this you must change the app.component.html and insert our new element as a component:

```javascript
  <div class="body">
    <oevents-toolbar></oevents-toolbar>
    <router-outlet></router-outlet>
  </div>
  ```

Note that we've deleted both event-list and landing-page elements because these components are now managed by the route module. We keep the toolbar since it will be visible through the whole application. The new components activated from the route module through their url/paths will be accessible below the `<router-outlet></router-outlet>` tag.

Our next step is to create the remaining components: login and profile. To do this, and insert them in their folders, we need to execute:

```
ng g component /login
ng g component /profile
```

## Router Link

Now, we are ready to navigate to our new URLs. We could write the URL in the browser URL bar, http://localhost:4200/home for example, and the app should show the home.component.html view. But writing always a new URL would be a little annoying so we are going to set up the links of the toolbar.

To do this, we need a RouterLink directive as an attribute of our anchor tags of toolbar.component.html like this:

```javascript
<mat-toolbar color="primary">
  <a mat-button routerLink="/home" routerLinkActive="activeLink">Home</a>
  <a mat-button routerLink="/events" routerLinkActive="activeLink">Events</a>
  <a mat-button routerLink="/profile" routerLinkActive="activeLink">Profile</a>
  <a mat-button routerLink="/login" routerLinkActive="activeLink">Login</a>
</mat-toolbar>
```

As you can see, we write the path we want to reach as values of routerLink attribute. The Router will search this path in our router module and will activate the component set up in their object from `routes` array (previously seen).
Notice now the routerLinkActive attribute: this attribute indicates what CSS class will be applied when the URL matches with the path configured in this tag.

## From model class to model interface

Now we have our app ready to do good things in a real world. But we would like to introduce a last concept.

We defined the event model as a class. Now we are going to change it into an interface. The only thing we are going to do is to change the "class" word for the "interface" word in /models/event.ts:

```javascript
export interface Event {
    id: string;
    title: string;
    location: string;
    date: Date;
    description: string;
    addedBy: string;
}
```

This change not only follows the Angular best practices (https://angular.io/guide/styleguide#interfaces), also we use the correct definition of the model. It's better to define the models as interfaces to make it lighter and efficient.

This interface is the Model in MVVM design pattern. The reason behind creating a separate component is an architectural best practice that is codified in the Model-View-ViewModel (MVVM) design pattern. 

> **_Side Note:_**  You may have heard of the Model-View-Controller (MVC) pattern before. Vast majority of web-based code written circa 2005-2015 has been written following the MVC pattern. MVVM differs, in important ways, from the MVC pattern. You can find more about this in a lot of articles on Internet, e.g. <a href="https://www.htmlgoodies.com/beyond/javascript/the-model-view-viewmodel-pattern-and-angular-development.html">here</a>.

<br/>
<br/>
<br/>

[< Lab 02 - Angular Basics](../lab-02) | [Lab 04 - Services >](../lab-04)


<p align="center">
    <img src="../boring-theory-1/resources/header.png">
</p>
