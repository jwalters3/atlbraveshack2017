import { Component } from '@angular/core';

import { SettingsPage } from '../settings/settings';
import { TasksPage } from '../tasks/tasks';
import { UploadPage } from '../upload/upload';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  rootPage = UploadPage;
  tab1Root = UploadPage;
  tab2Root = TasksPage;
  tab3Root = SettingsPage;

  constructor() {

  }
}
