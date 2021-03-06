import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpModule} from '@angular/http';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {SignUpComponent} from './components/auth/signup/signup.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './components/auth/login/login.component';
import {ApiService} from './services/api.service';
import {UserService} from './services/user.service';
import {NewsService} from './services/news.service';
import {NewsListComponent} from './components/news/news-list/news-list.component';
import {NewsItemComponent} from './components/news/news-item/news-item.component';
import {NewsHeaderComponent} from './components/news/news-header/news-header.component';
import {NewsFormComponent} from './components/news/news-form/news-form.component';
import {NewsDetailComponent} from './components/news/news-detail/news-detail.component';
import {NewsDeleteComponent} from './components/news/news-delete/news-delete.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {MyMessagesComponent} from './components/profile/my-messages/my-messages.component';
import {UserProfileComponent} from './components/profile/user-profile/user-profile.component';
import {MessagesFormComponent} from './components/messages/message-form/messages-form.component';
import {MessageService} from './services/message.service';
import {MessageDetailComponent} from './components/messages/message-detail/message-detail.component';
import {MessageNotificationComponent} from './components/messages/message-notification/message-notification.component';
import {UserDropdownComponent} from './components/user-dropdown/user-dropdown.component';

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
    MyMessagesComponent,
    UserProfileComponent,
    MessagesFormComponent,
    MessageDetailComponent,
    MessageNotificationComponent,
    UserDropdownComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule.forRoot(),
    InfiniteScrollModule
  ],
  providers: [
    ApiService,
    UserService,
    NewsService,
    NgbModal,
    MessageService,
  ],
  entryComponents: [MessagesFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
