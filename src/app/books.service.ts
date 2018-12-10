import { Injectable } from '@angular/core';
import { EventService } from './event.service';
import { MyCollectionService } from './my-collection.service';
import { BrowseBooksService } from './browse-books.service';
import { EventType } from './event.enum';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private eventType:EventType = EventType.MENU_BROWSE_CLICKED;

  constructor(private eventService:EventService,
    private myCollectionService: MyCollectionService,
    private browseBooksService:BrowseBooksService) {
      this.eventService.menuClikced$
        .subscribe(eventType => this.eventType = eventType);
  }

  public getBookById(id:string):Book{
    console.log(`Event type is ${this.eventType}`);
    if(this.eventType === EventType.MENU_BROWSE_CLICKED){
      return this.browseBooksService.getBookById(id);
    }else {
      return this.myCollectionService.getBookById(id);
    }
  }
}
