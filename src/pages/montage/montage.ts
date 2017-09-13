import { Component } from '@angular/core';

import { NavController, NavParams, ViewController, Platform } from 'ionic-angular';

import { App } from 'ionic-angular';
//import { User } from '../../providers/providers';
import { Photos } from '../../providers/photos';
import { Events } from '../../providers/events';

@Component({
  selector: 'page-montage',
  templateUrl: 'montage.html'
})
export class MontagePage {

  public userphotos: any = null;
  private music: string;
  private iterator: any;
  private effectsClasses: Array<string> = ['kenburns-left', 'kenburns-top', 'kenburns-top-right'];
  private musicSources: Array<string> = [
    'https://freemusicarchive.org/file/music/ccCommunity/The_Kyoto_Connection/Wake_Up/The_Kyoto_Connection_-_09_-_Hachiko_The_Faithtful_Dog.mp3',
    'https://freemusicarchive.org/file/music/ccCommunity/BoxCat_Games/Nameless_The_Hackers_RPG_Soundtrack/BoxCat_Games_-_10_-_Epic_Song.mp3',
    'https://freemusicarchive.org/file/music/WFMU/Gillicuddy/Plays_Guitar/Gillicuddy_-_05_-_Springish.mp3'
    ];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events: Events,
							public photos: Photos,
              public viewCtrl: ViewController,              
              //public userData: UserData,
              public platform: Platform) {

    this.userphotos = navParams.get('userphotos');
  }

  ionViewDidEnter() {
    this.music = '<audio autoplay> <source src="' + this.getMusic() + '" type="audio/mpeg"> </audio>';
    this.userphotos.forEach(photo => { photo.class = null;});
    this.startMontage();
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  done() { 
    this.viewCtrl.dismiss();
  }

  getClass() {
    return this.effectsClasses[Math.floor(Math.random() * this.effectsClasses.length)];
  }
  getMusic() {
    return  this.musicSources[Math.floor(Math.random() * this.musicSources.length)];
  }
  getStyle(index) {
    return { 'top': 10 + index % 3 * 10 + '%', 'position': 'absolute', 'opacity': 0 };
  }
  nextSlide() {
    let result = this.iterator.next();

    if (!result.done) {
      result.value.class = this.getClass();
      setTimeout(this.nextSlide.bind(this), 5000);
    }
  }
  startMontage() {
    this.iterator = null
    this.iterator = this.userphotos[Symbol.iterator]();
    this.nextSlide(); 
  }
}
