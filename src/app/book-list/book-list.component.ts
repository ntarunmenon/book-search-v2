import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { MyCollectionService } from '../my-collection.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  private books: Book[] = [];

  constructor(private myCollectionService:MyCollectionService) { }

  ngOnInit() {
    this.books = this.myCollectionService.getBooks();
  }

}
