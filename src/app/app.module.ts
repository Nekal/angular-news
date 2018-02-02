import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {SignUpComponent} from './components/auth/signup/signup.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './components/auth/login/login.component';
import {ApiService} from './services/api.service';
import {UserService} from './services/user.service';
import {HttpModule} from '@angular/http';
import {NewsService} from './services/news.service';
import {NewsListComponent} from './components/news/news-list/news-list.component';
import {NewsItemComponent} from './components/news/news-item/news-item.component';
import {NewsHeaderComponent} from './components/news/news-header/news-header.component';
import {NewsFormComponent} from './components/news/news-form/news-form.component';
import {NewsDetailComponent} from './components/news/news-detail/news-detail.component';
import {NewsDeleteComponent} from './components/news/news-delete/news-delete.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NotFoundComponent} from './components/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignUpComponent,
    LoginComponent,
    NewsListComponent,
    NewsItemComponent,
    NewsHeaderComponent,
    NewsFormComponent,
    NewsDetailComponent,
    NewsDeleteComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
  ],
  providers: [
    ApiService,
    UserService,
    NewsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
