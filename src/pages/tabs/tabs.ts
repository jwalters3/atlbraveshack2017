import { Component } from '@angular/core';

import { CollectionPage } from '../collection/collection';
import { UploadPage } from '../upload/upload';
import { VotePage } from '../vote/vote';
import { LeaderboardPage } from '../leaderboard/leaderboard';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  rootPage = UploadPage;
  tab1Root = UploadPage;
  tab2Root = VotePage;
  tab3Root = LeaderboardPage;
  tab4Root = CollectionPage;

  constructor() {

  }
}
