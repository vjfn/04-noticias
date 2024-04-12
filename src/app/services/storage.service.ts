import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  private _localArticles: Article [] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  get getLocalArticles() {
    return [ ...this._localArticles ];
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.loadFavorites();
  }

  async saveRemoveArticle ( article : Article){

    const exists = this._localArticles.find(localArticle => localArticle.title === article.title);

    if( exists ) {
      this._localArticles = this._localArticles.filter( localArticle => localArticle.title !== article.title);
    } else {
      this._localArticles = [article, ...this._localArticles];
    }

    this._storage?.set('articles', this._localArticles);

  }

  async loadFavorites(){

    try {

      const articles = await this._storage?.get('articles');
      this._localArticles = articles || [];
      
    } catch (error) {

      console.log('Error al carcar favoritos en "loadFavorites"')
      
    }

  }

  articleIsInFavorites (article: Article){

    return !!this._localArticles.find( localArticle => localArticle.title === article.title);

  
  }

  // Create and expose methods that users of this service can
  // call, for example:
/*   public set(key: string, value: any) {
    this._storage?.set(key, value);
  } */
}