import { Component } from '@angular/core';

import { NavController, ModalController, ToastController } from 'ionic-angular';
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
  public voteCount: any = 0;
  private photosTable: string = 'bftbs-photos';

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public events: Events,
              private toastCtrl: ToastController,
              public userData: UserData,
              public user: User,
              public db: DynamoDB,
              public photos: Photos) {
                   
  }

  ionViewDidEnter() {
        console.log('load votes');
        let currentInning = this.events.getInningEvent(this.userData.getInning());
        this.name = currentInning.name;
        this.description = currentInning.description;
        this.currentEvent = currentInning.id;
        this.getEventPictures();        
      }
    

  
  getEventPictures() {
    this.photos.getPhotosForEvent(this.events.getActiveEventId()).then(data => {
      this.items = data;
      console.log(this.items);
      this.loadVotes();
      if (this.refresher) {
        this.refresher.complete();
      }
    })
  }

  loadVotes() {
    // find out how many votes you have left
    this.photos.getUserVotes(this.user.getUsername(), this.events.getActiveEventId()).then((data: Array<any>) => {
      console.log(data);
      this.voteCount = data.length;
      data.forEach(vote => {
        let photo = this.items.find(p => { return p.id == vote.photoId; })
        photo.voted = true;
      });
    })
  }

  showVoteRemaining() { 
    let toast = this.toastCtrl.create({
      message: (5-this.voteCount) + ' votes remaining',
      duration: 1000,
      position: 'middle',
      cssClass: "vote-prompt"
    });    
    toast.present();
    
  }

  showVoteLimit() {
    let toast = this.toastCtrl.create({
      message: 'You have no more votes',
      duration: 1000,
      position: 'middle'      
    });    
    toast.present();
  }


  vote(item) {
    console.log(item);
      if (item.voted) {
        item.voted = false;
        this.photos.unvote(item.id, this.user.getUsername())
        this.voteCount--;
        // to do - remove this vote
        this.showVoteRemaining();   
      } else {
        if (this.voteCount < 5) {
          item.voted = true;
          this.photos.vote(item.id, this.user.getUsername())
          this.voteCount++;
          // to do - save this vote
          this.showVoteRemaining();   
        } else {
          this.showVoteLimit();
        }
      }
      
      
  }

}
