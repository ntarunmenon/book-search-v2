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
  private books:Book[] = [];
  
  constructor(private eventService:EventService,
    private myCollectionService: MyCollectionService,
    private browseBooksService:BrowseBooksService) {
      this.eventService.menuClikced$
        .subscribe(eventType => { 
          this.eventType = eventType;
          if(this.eventType === EventType.MENU_BROWSE_CLICKED){
            this.books =  this.browseBooksService.getBooks();
          }else {
            this.books =  this.myCollectionService.getBooks();
          }
        });
  }

  public getBookById(id:string):Book{
    if(this.eventType === EventType.MENU_BROWSE_CLICKED){
      return this.browseBooksService.getBookById(id);
    }else {
      return this.myCollectionService.getBookById(id);
    }
  }

  public getBooks():Book[]{
    return this.books.slice();
  }

  public getEventType():EventType {
    return this.eventType;
  }
}
