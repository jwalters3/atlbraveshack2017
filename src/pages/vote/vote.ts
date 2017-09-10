import { Component } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';
import { DynamoDB, User } from '../../providers/providers';
import { Events } from '../../providers/events';
import { Photos } from '../../providers/photos';

@Component({
  selector: 'page-vote',
  templateUrl: 'vote.html'
})
export class VotePage {

  public items: any;
  public refresher: any;
  public voted: any;
  private photosTable: string = 'bftbs-photos';

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public user: User,
              public db: DynamoDB,
              public events: Events,
              public photos: Photos) {

                this.voted = false;
    this.refreshTasks();
  }


  refreshTasks() {
    this.getEventPictures();
  }
  
  getEventPictures() {
    this.photos.getPhotosForEvent(this.events.getActiveEventId()).then(data => {
      this.items = data;
      console.log(this.items);
      if (this.refresher) {
        this.refresher.complete();
      }
    })
  }

  vote(item) {
      this.voted = !this.voted;
      // to do - save this vote
  }

}
