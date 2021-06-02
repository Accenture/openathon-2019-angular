import { Action } from '@ngrx/store'

export const LOGGED = 'login/logged'

export class Logged implements Action {
  readonly type = LOGGED;

  constructor(public payload: boolean) {}
}


export type Actions = Logged;
