import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { EventType } from '../event.enum';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  myCollectionClicked:boolean = true;
  
  constructor(private eventService:EventService) { }

  ngOnInit() {

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
