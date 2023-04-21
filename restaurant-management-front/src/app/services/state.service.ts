import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  state: BehaviorSubject<any> = new BehaviorSubject<any>({
    _id:'',
    email: '',
    fullname: '',
    role: '',
    token:''

  });
  constructor() { }
}
