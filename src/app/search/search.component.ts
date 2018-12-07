import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { EventType } from '../event.enum';
import { Subject } from 'rxjs';
import { BrowseBooksService } from '../browse-books.service';
import { Book } from '../book';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  myCollectionClicked:boolean = true;
  searchTerm$ = new Subject<string>();
  
  
  constructor(private eventService:EventService,
    private booksService:BrowseBooksService) { }

  ngOnInit() {
     this.booksService.setSerchTerm(this.searchTerm$);

    this.eventService.menuClikced$.subscribe(
      eventType => {
        if (eventType === EventType.MENU_MYCOLLECTION_CLICKED){
          this.myCollectionClicked = true;
        } else if (eventType === EventType.MENU_BROWSE_CLICKED) {
          this.myCollectionClicked = false;
        }
      }
    );
  }

}
