import { Action } from '@ngrx/store';

export const GET_FILTERED_EVENTS = 'layout/GET_FILTERED_EVENTS';
export const GET_FILTERED_EVENTS_SUCCESS = 'layout/GET_FILTERED_EVENTS_SUCCESS';
export const GET_FILTERED_EVENTS_ERROR = 'layout/GET_FILTERED_EVENTS_ERROR';

export class GetFilteredEvents implements Action {
  readonly type = GET_FILTERED_EVENTS;

  constructor(public payload: string) {}
}

export class GetFilteredEventsSuccess implements Action {
  readonly type = GET_FILTERED_EVENTS_SUCCESS;

  constructor(public payload: any[]) {}
}

export class GetFilteredEventsError implements Action {
  readonly type = GET_FILTERED_EVENTS_ERROR;

  constructor(public payload: any) {}
}


export type Actions = GetFilteredEvents | GetFilteredEventsSuccess | GetFilteredEventsError;
