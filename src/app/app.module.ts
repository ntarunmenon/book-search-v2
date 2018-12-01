import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './/app-routing.module';
import { BookListComponent } from './book-list/book-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BookItemComponent } from './book-list/book-item/book-item.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    BookDetailComponent,
    SideBarComponent,
    HeaderComponent,
    BookListComponent,
    PageNotFoundComponent,
    BookItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
