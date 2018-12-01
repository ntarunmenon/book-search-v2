import { Component, OnInit } from '@angular/core';
import { Book } from '../book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  private books: Book[] = [];

  constructor() { }

  ngOnInit() {
    this.books[0] = {id:"1",
      title:'The Alchemist',
      description:  `This is an adventure story about a young shepherd 
          boy who learns how to live his dreams. This is a story which has been compared 
          to the works of Richard Bach, and is aimed at the young and old alike.`,
      author:'Paulo Coelho',
      url:'http://books.google.com/books/content?id=6bBPrgEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api'}
  }

}
