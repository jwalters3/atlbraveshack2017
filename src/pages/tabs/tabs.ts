import { Component } from '@angular/core';

import { SettingsPage } from '../settings/settings';
import { TasksPage } from '../tasks/tasks';
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
  tab4Root = SettingsPage;

  constructor() {

  }
}
