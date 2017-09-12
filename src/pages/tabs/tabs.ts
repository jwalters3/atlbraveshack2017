import { Component } from '@angular/core';

import { CollectionPage } from '../collection/collection';
import { UploadPage } from '../upload/upload';
import { VotePage } from '../vote/vote';
import { LoginPage } from '../login/login';
import { LeaderboardPage } from '../leaderboard/leaderboard';
import { App } from 'ionic-angular';
import { User } from '../../providers/providers';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  rootPage = UploadPage;
  tab1Root = UploadPage;
  tab2Root = VotePage;
  tab3Root = LeaderboardPage;
  tab4Root = CollectionPage;

  constructor(public user: User, public app: App) {

  }

  logout() {
    this.user.logout();
    this.app.getRootNav().setRoot(LoginPage);
  }
}
