import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Platform } from 'ionic-angular';
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
              public events: Events,
							public photos: Photos,
              public viewCtrl: ViewController,              
              public userData: UserData,
              public platform: Platform) {

    this.inning = navParams.get('inning');

		//this.items =  [98, 93, 85, 76, 54, 52, 49, 48, 44, 39];

  }

  ionViewDidEnter() {

    let currentInning = this.events.getInningEvent(this.userData.getInning());
    this.name = currentInning.name;
    this.description = currentInning.description;
    this.currentEvent = currentInning.id;
		this.photos.getPhotosForEvent(this.currentEvent).then(items => {
			this.items = items;
		});
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  done() { 
    this.viewCtrl.dismiss();
  }
}
