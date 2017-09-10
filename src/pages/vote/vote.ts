import { Component } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';
import { DynamoDB, User } from '../../providers/providers';
import { Events } from '../../providers/events';
import { UserData } from '../../providers/user-data';

declare var AWS: any;

@Component({
  selector: 'page-vote',
  templateUrl: 'vote.html'
})
export class VotePage {

  name: any;
  description: any;
  inning: any;
  currentEvent: any;
  public items: any;
  public refresher: any;
  public voted: any;
  private taskTable: string = 'bftbs-events';

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public events: Events,
              public userData: UserData,
              public user: User,
              public db: DynamoDB) {

                this.voted = false;    
  }

  ionViewDidLoad() {
    
        let currentInning = this.events.getInningEvent(this.userData.getInning());
        this.name = currentInning.name;
        this.description = currentInning.description;
        this.currentEvent = currentInning.id;
        this.refreshTasks();
      }
    

  refreshTasks() {
  
  }

  vote(item) {
      this.voted = !this.voted;
      // to do - save this vote
  }

}
