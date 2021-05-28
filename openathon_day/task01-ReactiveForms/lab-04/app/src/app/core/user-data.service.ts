import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  userArray: User[] = new Array();
  constructor() { }
}
