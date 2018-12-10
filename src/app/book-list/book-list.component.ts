import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../book';
import { MyCollectionService } from '../my-collection.service';
import { Observable, Subscription } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { BrowseBooksService } from '../browse-books.service';
import { EventService } from '../event.service';
import { EventType } from '../event.enum';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit,OnDestroy {

  private myCollectionSubscription: Subscription;
  private myCollectionBooks: Book[] = [];
  private searchBooksSubscription: Subscription;
  private searchResultsList: Book[] = [];
  private books: Book[] = [];

  constructor(private myCollectionService:MyCollectionService,
    private browseBooksService:BrowseBooksService,
    private booksService:BooksService,
    private eventService:EventService) { }

  ngOnInit() {
    this.myCollectionSubscription = this.myCollectionService.myCollectionBooks$.subscribe(
      books => {
        this.myCollectionBooks = books;
        this.books = books;
      }
    );
    this.searchBooksSubscription = this.browseBooksService.searchResults$.subscribe(
      books => {
        this.searchResultsList = books;
        this.books = books;
      }
    );

    this.eventService.menuClikced$.subscribe(
      eventType => this.books = this.booksService.getBooks());
    
      if(this.books.length == 0) {
      this.books = this.booksService.getBooks();
    }
   
  }

  ngOnDestroy(){
    this.myCollectionSubscription.unsubscribe();
  }

}
