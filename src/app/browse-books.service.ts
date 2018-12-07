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
  searchResults$ : Observable<Book[]> 
  private searchTerms$: Observable<string>;
 
  constructor(private http: HttpClient) {
    this.searchResults$ = of([])
  }

  search() {
    this.searchResults$ =  this.searchTerms$.pipe(
       debounceTime(400)
       , distinctUntilChanged()
       , filter(term => term.length > 4 )
       , switchMap(term => this.performsearch(term))
    );
  }

  performsearch(searchTerms:string):Observable<Book[]>{
    console.log(`searching with ${searchTerms}`);

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

  setSerchTerm(searchTerm : Observable<string>){
      this.searchTerms$ = searchTerm;
      this.search();
  }
}

