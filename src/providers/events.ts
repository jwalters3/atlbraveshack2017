import { Injectable } from '@angular/core';
import { DynamoDB } from './providers';

@Injectable()
export class Events {

  private events: any;
  private activeEvent: string;
  private eventTable: string = 'bftbs-events';

  constructor(public db: DynamoDB) {
      this.refreshData();
  }

  getActiveEvent() {
      return this.events.find(e => { return e.id === this.activeEvent; });
  }

  getEvents() {
      return this.events;
  }

  getInningEvent(inning) {
      return this.events.find(e => { return e.inning === inning; });
  }

  refreshData() {
    return new Promise((resolve, reject) => {
        this.db.getDocumentClient().scan({
        'TableName': this.eventTable,
        }).promise().then((data) => {
            this.events = data.Items.sort((a, b) => {
                return a.inning > b.inning;
            });
            resolve(this.events);

        }).catch((err) => {
            console.log(err);
            reject(err);
        });
    });
  }

  setActiveEvent(event) {
    this.activeEvent = event;
  }


}
