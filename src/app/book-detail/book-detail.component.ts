import { Component, OnInit } from '@angular/core';
import { MyCollectionService } from '../my-collection.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Book } from '../book';
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  book:Book;
  canRemoveFromCollection: boolean = true;

  constructor(private myCollectionService: MyCollectionService,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.route
    .paramMap.pipe(
      switchMap((params:ParamMap) => of(params.get('id')))
    ).subscribe((id) => {
      this.book = this.myCollectionService.getBookById(id);
    })
  }

  removeFromCollection(){
    this.myCollectionService.removeBookFromCollection(this.book.id);
    this.canRemoveFromCollection = false;
  }

  addToCollection(){
    this.myCollectionService.addBookToCollection(this.book);
    this.canRemoveFromCollection = true;
  }

}
