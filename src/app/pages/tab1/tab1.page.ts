import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild(IonInfiniteScroll, {static : true}) infiniteScroll!: IonInfiniteScroll;

  public articles: Article[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.getTopHeadLines()
      .subscribe(articles => this.articles.push(...articles));
  }

  loadData( event:any){
    this.newsService.getTopHeadLinesByCategory('business', true)
    .subscribe( articles =>{
      

      setTimeout(() => {
        if( articles.length === this.articles.length){
          this.infiniteScroll.disabled = true;
/*           event.target.disables = true; */
          return;
        }

        this.articles = articles;
        this.infiniteScroll.complete();
/*         event.target.complete(); */
      },1000);
    })
  }

}


