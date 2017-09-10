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
  private taskTable: string = 'bftbs-events';

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public user: User,
              public db: DynamoDB) {

    this.refreshTasks();
  }


  refreshTasks() {
  
  }

}
