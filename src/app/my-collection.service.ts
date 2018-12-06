import { Injectable } from '@angular/core';
import { Book } from './book';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyCollectionService {

  private books:Book[] = [];
  myCollectionBooks$ : Observable<Book[]> 
  
  constructor() { 
    
    this.books[0] = {id:"1",
    title:'The Alchemist',
    description:  `This is an adventure story about a young shepherd 
        boy who learns how to live his dreams. This is a story which has been compared 
        to the works of Richard Bach, and is aimed at the young and old alike.`,
    author:'Paulo Coelho',
    url:'http://books.google.com/books/content?id=6bBPrgEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api'}
    this.myCollectionBooks$
 = of(this.books);
  }


  public getBookById(id:string):Book {
    return this.books.find(book => book.id === id);
  }

  public addBookToCollection(book: Book){
    this.books.push(book);
  }

  public removeBookFromCollection(id:string) {
    let index = +this.books.find(book => book.id === id);
    this.books.splice(index,1);
  }
}
