import { Component } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import {MyApp} from '../../app/app.component';

@Component({
  selector: 'page-ballpark',
  templateUrl: 'ballpark.html'
})

export class BallparkPage {
  
  constructor(public myApp: MyApp,
                public navCtrl: NavController,              
              public loadingCtrl: LoadingController) {
    
  }

  gotoApp() {
      console.log('goto app');
      this.navCtrl.push(TabsPage);
  }
}
