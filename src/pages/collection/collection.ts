import { Component } from '@angular/core';
import { App } from 'ionic-angular';
import { User } from '../../providers/providers';
import { Photos } from '../../providers/photos';

@Component({
  selector: 'page-collection',
  templateUrl: 'collection.html'
})
export class CollectionPage {

  public userphotos: any = null;

  constructor(public user: User, 
    public photos: Photos,
    public app: App) {

  }

  ionViewDidEnter() {
    console.log('load');
    let currentInning = this.photos.getPhotosForUser(this.user.getUsername()).then((data: Array<any>) => {
      this.userphotos = data;
      console.log(data);     
      data.forEach(vote => {
        //let photo = this.items.find(p => { return p.id == vote.photoId; })
        //photo.voted = true;
      });
    });
  }
   

}
