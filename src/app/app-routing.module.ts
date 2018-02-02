import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {SignUpComponent} from './components/auth/signup/signup.component';
import {LoginComponent} from './components/auth/login/login.component';
import {NewsListComponent} from './components/news/news-list/news-list.component';
import {NewsFormComponent} from './components/news/news-form/news-form.component';
import {NewsDetailComponent} from './components/news/news-detail/news-detail.component';
import {NotFoundComponent} from './components/not-found/not-found.component';

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
