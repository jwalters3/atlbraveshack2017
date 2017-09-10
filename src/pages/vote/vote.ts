import { Component } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';
import { DynamoDB, User } from '../../providers/providers';

declare var AWS: any;

@Component({
  selector: 'page-vote',
  templateUrl: 'vote.html'
})
export class VotePage {

  public items: any;
  public refresher: any;
  public voted: any;
  private taskTable: string = 'bftbs-events';

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public user: User,
              public db: DynamoDB) {

                this.voted = false;
    this.refreshTasks();
  }


  refreshTasks() {
  
  }

  vote(item) {
      this.voted = !this.voted;
      // to do - save this vote
  }

}
