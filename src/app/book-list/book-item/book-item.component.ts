import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/book';
import { Router } from '@angular/router';


@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {

  @Input() book: Book;
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  viewBookDetail() {
    this.router.navigate(['/bookDetail',this.book.id]);
  }

}
