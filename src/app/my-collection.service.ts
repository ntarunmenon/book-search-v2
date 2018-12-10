import { Injectable } from '@angular/core';
import { Book } from './book';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyCollectionService {

  private books:Book[] = [];
  private booksSubject = new Subject<Book[]>();
  myCollectionBooks$ = this.booksSubject.asObservable();
  
  constructor() { 
  }


  public getBookById(id:string):Book {
    return this.books.find(book => book.id === id);
  }

  public addBookToCollection(book: Book){
    this.books.push(book);
    this.booksSubject.next(this.books);
  }

  public removeBookFromCollection(id:string) {
    let index = +this.books.find(book => book.id === id);
    this.books.splice(index,1);
    this.booksSubject.next(this.books);
  }

  getBooks():Book[]{
    return this.books;
  }
}
