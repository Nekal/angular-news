import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {SignUpComponent} from './components/auth/signup/signup.component';
import {LoginComponent} from './components/auth/login/login.component';
import {NewsListComponent} from './components/news/news-list/news-list.component';
import {NewsFormComponent} from './components/news/news-form/news-form.component';
import {NewsDetailComponent} from './components/news/news-detail/news-detail.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {UserProfileComponent} from './components/profile/user-profile/user-profile.component';
import {MessagesFormComponent} from './components/messages/message-form/messages-form.component';
import {MyMessagesComponent} from './components/profile/my-messages/my-messages.component';

const appRoutes: Routes = [
  {
    path: '',
    component: NewsListComponent
  },
  {
    path: 'news/:id',
    component: NewsDetailComponent
  },
  {
    path: 'test',
    component: MessagesFormComponent
  },
  {
    path: 'signin',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'create',
    component: NewsFormComponent
  },
  {
    path: 'edit/:id',
    component: NewsFormComponent
  },
  {
    path: 'profile/mymessages',
    component: MyMessagesComponent
  },
  {
    path: 'profile/:id',
    component: UserProfileComponent
  },
  {
    path: '*',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
