import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '../event.service';
import { Subscription } from 'rxjs';
import { EventType } from '../event.enum';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit,OnDestroy {
 
  subscription: Subscription;
  showMenu : String;
  
  constructor(private eventService:EventService) { 
    this.subscription = this.eventService.menuClikced$.subscribe
      (event => {
        switch (event) {
          case EventType.MENU_CLICKED: {
            this.showMenu = "block";
            break;
          }
        }
      })
  }

  ngOnInit() {
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  myCollectionClicked(){
    this.eventService.menuClickedEvent(EventType.MENU_MYCOLLECTION_CLICKED);
    this.showMenu = "none";
  }

  browseClicked() {
    this.eventService.menuClickedEvent(EventType.MENU_BROWSE_CLICKED);
    this.showMenu = "none";
  }


}
