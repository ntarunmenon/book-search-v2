import { Injectable } from '@angular/core';
import { Book } from './book';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrowseBooksService {

  private books:Book[] = [];
  searchResults$ : Observable<Book[]> 

  
  constructor() { 
    this.books[0] = {id:"2",
    title:'The Life-Changing Manga of Tidying Up',
    description:  `From the #1 New York Times best-selling author and lifestyle/cleaning guru Marie Kondo, 
    this graphic novelization brings Kondo's life-changing tidying method to life with the fun, 
    quirky story of a woman who transforms her home, work, and love life using Kondo's 
    advice and inspiration. Marie Kondo presents the fictional story of Chiaki, 
    a young woman in Tokyo who struggles with a cluttered apartment, messy love life, 
    and lack of direction. After receiving a complaint from her attractive next-door 
    neighbor about the sad state of her balcony, Chiaki gets Kondo to take her on as a 
    client. Through a series of entertaining and insightful lessons, Kondo helps 
    Chiaki get her home--and life--in order. This insightful, illustrated case study is perfect for people looking for a fun introduction to the KonMari Method of tidying up, as well as tried-and-true fans of Marie Kondo eager for a new way to think about what sparks joy. 
    Featuring illustrations by award-winning manga artist Yuko Uramoto, this book also makes a great read for manga and graphic novel lovers of all ages.`,
    author:'Marie Kondo',
    url:'http://books.google.com/books/content?id=fwIEDgAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api'}
    this.searchResults$ = of(this.books);
  }
}
