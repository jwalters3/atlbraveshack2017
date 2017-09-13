import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { DynamoDB } from '../../providers/providers'
import { Events } from '../../providers/events';
import { Photos } from '../../providers/photos';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-leaderboard-pics',
  templateUrl: 'leaderboardpics.html'
})
export class LeaderboardPicsPage {

  name: any;
  description: any;
  inning: any;
  items : any;
  currentEvent: any;
  
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dynamo: DynamoDB,
              public events: Events,
							public photos: Photos,
              public viewCtrl: ViewController,              
              public userData: UserData,
              public platform: Platform) {

    this.inning = navParams.get('inning');

		//this.items =  [98, 93, 85, 76, 54, 52, 49, 48, 44, 39];

  }

  ionViewDidEnter() {

    let currentInning = this.events.getInningEvent(this.inning);
    this.name = currentInning.name;
    this.description = currentInning.description;
    this.currentEvent = currentInning.id;
    this.loadPhotos();
  }

  loadPhotos() {
    this.photos.getPhotosForEvent(this.currentEvent).then((items:Array<any>) => {
      let sorted = [];
      for(let item of items) {
        this.photos.getVoteCountForPhoto(item.id).then(count => {
          // Sorting as items are loaded
          let i = 0, max = sorted.length;
          item.votes = count;
          while(i < max && sorted[i].votes > count) {
            i += 1;
          }
          sorted.splice(i, 0, item);
          if (sorted.length === items.length) {
            this.items = sorted;
          }
        });
      }
		});
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  done() { 
    this.viewCtrl.dismiss();
  }
}
