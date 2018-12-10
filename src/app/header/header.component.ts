import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EventService } from '../event.service';
import { EventType } from '../event.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private eventService:EventService) { }

  ngOnInit() {
  }

  menuClicked(){
    this.eventService.menuClickedEvent(EventType.MENU_BROWSE_CLICKED);
  }
}
