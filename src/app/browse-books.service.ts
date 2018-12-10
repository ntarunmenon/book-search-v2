import { Injectable } from '@angular/core';
import { Book } from './book';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { concatAll, debounceTime, toArray, distinctUntilChanged, switchMap,map, filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BrowseBooksService {
  
  
  
  SEARCH_URL = 'https://www.googleapis.com/books/v1/volumes';
  private books:Book[] = [];
  searchResults$ : Observable<Book[]>  = of([]);
  private searchTerms$: Observable<string>;
 
  constructor(private http: HttpClient) {}

  search() {
    this.searchResults$ =  this.searchTerms$.pipe(
       debounceTime(400)
       , distinctUntilChanged()
       , filter(term => term.length > 4 )
       , switchMap(term => this.performsearch(term))
    );
    this.searchResults$.subscribe(books => 
      {
        this.books = books;
      });
  }

  performsearch(searchTerms:string):Observable<Book[]>{
    return this.http.get(this.SEARCH_URL, {
      params: {
          q:searchTerms
      }
  }).pipe(
    map(data => data['items'])
    ,concatAll()
    , map(data => {
        return {
            id: data['id'],
            title: data['volumeInfo'].title,
            url: data['volumeInfo'].imageLinks.smallThumbnail,
            description: data.hasOwnProperty('searchInfo') ? data['searchInfo'].textSnippet:"",
            author: data['volumeInfo'].authors
        }
    }),
    toArray());
  }

  getBookById(id: string): Book {
    console.log(`books from search is ${this.books}`)
    console.log(this.books);
    return this.books.find(book => book.id === id);
  }

  setSerchTerm(searchTerm : Observable<string>){
      this.searchTerms$ = searchTerm;
      this.search();
  }
}

