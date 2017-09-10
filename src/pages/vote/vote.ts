import { Component } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';
import { DynamoDB, User } from '../../providers/providers';
import { Events } from '../../providers/events';
import { Photos } from '../../providers/photos';
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
  private photosTable: string = 'bftbs-photos';

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public events: Events,
              public userData: UserData,
              public user: User,
              public db: DynamoDB,
              public photos: Photos) {

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
