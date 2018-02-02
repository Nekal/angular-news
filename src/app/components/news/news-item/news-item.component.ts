import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit} from '@angular/core';
import {News} from '../../../models/News';
import {ActiveNews} from '../../../services/news.service';

@Component({
  moduleId: module.id,
  selector: 'app-news-item',
  templateUrl: 'news-item.component.html',
  styleUrls: ['news-item.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})

export class NewsItemComponent implements OnInit {
  @Input() news: News;
  @Input() activeNewsID: number;
  status = false;

  constructor() {}
  ngOnInit() {
    this.checkStatus();
  }
  checkStatus() {
    if (this.activeNewsID === this.news.id) {
      this.status = true;
      setTimeout(() => {
        this.viewedNews();
      }, 1);
    }
  }
  viewedNews() {
    ActiveNews.clearActiveNewsId();
    this.status = false;
  }
}
