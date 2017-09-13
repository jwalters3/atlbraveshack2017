import { Component } from '@angular/core';

import { NavController, ModalController, Tabs } from 'ionic-angular';
import { MontagePage } from '../montage/montage';

import { App } from 'ionic-angular';
import { User } from '../../providers/providers';
import { Photos } from '../../providers/photos';
import { Events } from '../../providers/events';

@Component({
  selector: 'page-collection',
  templateUrl: 'collection.html'
})
export class CollectionPage {

  public userphotos: any = null;
  public rewards: any = [
    { url: 'assets/img/chophouse.jpg', eventname: 'Tomahawk Chop', date: 1505073218577, redeemed: true, name: 'Free Drink with Purchase of Entree from The Chop House'  },
    {  url: 'assets/img/hfburger.jpg',eventname: 'My First Game', date: 1505241525427, redeemed: false, name: '$2 Off at H&F Burger'  }
  ];

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public user: User, 
    public photos: Photos,
    public events: Events,
    public app: App) {

  }

  ionViewDidEnter() {
    console.log('load');
    let currentInning = this.photos.getPhotosForUser(this.user.getUsername()).then((data: Array<any>) => {
      this.userphotos = data;
      this.userphotos.forEach(photo => {
        photo.dateObj = new Date(photo.created);
        photo.eventname = this.events.getEvent(photo.event).name;
      });
      console.log(this.userphotos);     
      data.forEach(vote => {
        //let photo = this.items.find(p => { return p.id == vote.photoId; })
        //photo.voted = true;
      });
    });
  }

  showMontage() {
      let addModal = this.modalCtrl.create(MontagePage, { 'userphotos': this.userphotos });
      addModal.onDidDismiss(item => {
        
      });
      addModal.present();
  }
   

}
