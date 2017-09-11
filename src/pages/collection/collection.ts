import { Component } from '@angular/core';
import { App } from 'ionic-angular';
import { User } from '../../providers/providers';

@Component({
  selector: 'page-collection',
  templateUrl: 'collection.html'
})
export class CollectionPage {

  constructor(public user: User, public app: App) {
  }

}
