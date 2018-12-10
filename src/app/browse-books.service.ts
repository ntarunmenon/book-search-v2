import { Injectable } from '@angular/core';
import { Book } from './book';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { concatAll, debounceTime, toArray, distinctUntilChanged, switchMap,map, filter} from 'rxjs/operators';
import _ from "lodash";

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
    ,filter (data => {
       if(_.hasIn(data,'volumeInfo.title')
       && _.hasIn(data,'volumeInfo.imageLinks.smallThumbnail')
       && _.hasIn(data,'searchInfo.textSnippet')){
         console.log(data);
         return true;
       }
    })
    , map(data => {
        return {
            id: data['id'],
            title: data['volumeInfo'].title,
            url: data['volumeInfo'].imageLinks.smallThumbnail,
            description: data['searchInfo'].textSnippet,
            author: data['volumeInfo'].authors
        }
    }),
    toArray());
  }

  getBookById(id: string): Book {
    return this.books.find(book => book.id === id);
  }

  setSerchTerm(searchTerm : Observable<string>){
      this.searchTerms$ = searchTerm;
      this.search();
  }

  getBooks():Book[] {
    return this.books;
  }
}

