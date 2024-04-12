import { Component, Input } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

import { Browser } from '@capacitor/browser';
import { Share } from '@capacitor/share';

import { Article } from '../../interfaces';

import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {
  

  @Input() article!: Article;
  @Input() index!: number;

  constructor(
    private actionSheetController: ActionSheetController,
    private storageService: StorageService,

  ) { }

  async openArticle() {
    await Browser.open({url: this.article.url})
    /* window.open(this.article.url, "_blank"); */
  }
  async openMenu() {
    
    const articleInFavorite = this.storageService.articleIsInFavorites(this.article);

    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons:[
        {
          text: 'Compartir',
          icon: 'share-outline',
          handler: () => this.onShareArticle()
        },
        {
          text: articleInFavorite ? 'Remover Favorito' : 'Favorito',
          icon: articleInFavorite ? 'heart' : 'heart-outline',
          handler: () => this.onToggleFavorite()
        },
        {
          text: 'Cancelar',
          icon: 'cancel-outline',
          role: 'cancel',
          cssClass: 'secondary'
        }
      ]
    });

    await actionSheet.present()
  }

  async onShareArticle(){
    await Share.share({
      title: this.article.title,
      text: this.article.content,
      url: this.article.url,
      dialogTitle: 'Compartir con amigos!',
    });
  }

  onToggleFavorite(){
    this.storageService.saveRemoveArticle(this.article);
  }


}
