import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, SegmentChangeEventDetail } from '@ionic/angular';
import { IonSegmentCustomEvent } from '@ionic/core';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonInfiniteScroll, {static : true}) infiniteScroll!: IonInfiniteScroll;

  public categories: string[] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  public selectedCategory: string = this.categories[0];
  public articles: Article[] = [];

  constructor( private newsService:NewsService) { }

  ngOnInit() {
    this.newsService.getTopHeadLinesByCategory(this.selectedCategory)
    .subscribe( articles =>{
/*       console.log(articles); */
      this.articles = [ ...articles ]
    })


    
  }

  segmentChanged(event: Event) {
    this.selectedCategory = (event as CustomEvent).detail.value
    this.newsService.getTopHeadLinesByCategory(this.selectedCategory)
    .subscribe( articles =>{
      this.articles = [ ...articles ]
    })
  }

  loadData( event:any){
    this.newsService.getTopHeadLinesByCategory(this.selectedCategory, true)
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
