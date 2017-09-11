import { Component, ViewChild} from '@angular/core';

import { NavController, ModalController, Tabs } from 'ionic-angular';
import { LeaderboardPicsPage } from '../leaderboardpics/leaderboardpics';

import { DynamoDB, User } from '../../providers/providers';
import { UserData } from '../../providers/user-data';
import { Events } from '../../providers/events';

declare var AWS: any;

@Component({
  selector: 'page-leaderboard',
  templateUrl: 'leaderboard.html'
})
export class LeaderboardPage {

  @ViewChild('myTabs') tabRef: Tabs;

  public items: any;
  public refresher: any;
  public currentInning: any;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public user: User,
              public events: Events,
              public userData: UserData,
              public db: DynamoDB) {

    
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    this.currentInning = this.userData.getInning();
    this.refreshTasks();
   }

   itemSelected(item) {
      if (item.inning <= this.userData.getInning())
      {
        console.log('show leaderboard for ' + item.inning);

        let addModal = this.modalCtrl.create(LeaderboardPicsPage, { 'inning': item.inning });
        addModal.onDidDismiss(item => {
          
        });
        addModal.present();
      }
   }

  refreshData(refresher) {
    this.refresher = refresher;
    this.refreshTasks()
  }

  refreshTasks() {
    this.events.refreshData().then((data) => {
      this.items = data;
      //this.refresher.complete();
    }).catch(e => { console.log(e); });
  }

}
