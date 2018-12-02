import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
import { EventType } from './event.enum';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private menuClikced = new Subject<EventType>();
  menuClikced$ = this.menuClikced.asObservable();

  constructor() { }

  public menuClickedEvent(event:EventType){
    this.menuClikced.next(event);
  }
}
