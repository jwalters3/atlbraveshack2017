import { Component } from '@angular/core';
import { Config, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { User } from '../providers/user';
import { UserData } from '../providers/user-data';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = null;

  constructor(platform: Platform, userData: UserData, statusBar: StatusBar, splashScreen: SplashScreen, user: User, public config: Config) {
    let globalActions = function() {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    };

    platform.ready().then(() => {
      user.isAuthenticated().then(() => {
        console.log('you are authenticated!');
        console.log(user);
        this.rootPage = TabsPage;
        globalActions();
      }).catch(() => {
        console.log('you are not authenticated..'); 
        this.rootPage = LoginPage;
        globalActions();
      });
    });
  }
}
