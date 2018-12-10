import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '../event.service';
import { Subscription } from 'rxjs';
import { EventType } from '../event.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit,OnDestroy {
 
  subscription: Subscription;
  showMenu : String;
  
  constructor(private eventService:EventService,
    private router: Router) { 
    this.subscription = this.eventService.menuClikced$.subscribe
      (event => {
        switch (event) {
          case EventType.MENU_HEADER_CLICKED: {
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
    this.router.navigate(['/books']);
  }

  browseClicked() {
    this.eventService.menuClickedEvent(EventType.MENU_BROWSE_CLICKED);
    this.showMenu = "none";
    this.router.navigate(['/books']);
  }


}
