import * as layout from './layout.actions';
import { Event } from "../../models/event";

export interface State {
  filteredEvents: Event[];
  loading: boolean;
  error: any;
}

export const initialState: State = {
  filteredEvents: [],
  loading: false,
  error: null
}

export function reducer(state: State = initialState, action: layout.Actions): State {
  switch (action.type) {
    case layout.GET_FILTERED_EVENTS:
      return {
        ...state,
        filteredEvents: [],
        loading: true,
        error: null
      }

    case layout.GET_FILTERED_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        filteredEvents: action.payload,
        error: null
      }

    case layout.GET_FILTERED_EVENTS_ERROR:
      return {
        ...state,
        filteredEvents: [],
        loading: false,
        error: action.payload
      }

    default:
      return state;
  }
}
