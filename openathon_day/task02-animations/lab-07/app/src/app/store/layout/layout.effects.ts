import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { EventService } from '../../core/event.service';


@Injectable()
export class LayoutEffects {

  constructor(
    private actions$: Actions,
    private eventService: EventService
  ) {}

  @Effect()
  getFilteredEvents$ = this.actions$.pipe(
    ofType('layout/GET_FILTERED_EVENTS'),
    switchMap((filter: any) => this.eventService.getFilteredEvents(filter.payload)
      .pipe(
        map(res => ({ type: 'layout/GET_FILTERED_EVENTS_SUCCESS', payload: res })),
        catchError(error => of({ type: 'layout/GET_FILTERED_EVENTS_ERROR', payload: error }))
      )
    )
  )
}
