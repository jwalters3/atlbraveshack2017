import { Injectable } from '@angular/core';
import { DynamoDB } from './aws.dynamodb';

@Injectable()
export class Photos {

  private photosTable: string = 'bftbs-photos';

  constructor(public db: DynamoDB) {
      //this.refreshData();
  }

  getPhotosForEvent(event) {
    return new Promise((resolve, reject) => {

        this.db.getDocumentClient().query({
        'TableName': this.photosTable,
        //'IndexName': 'bftbs-photos-id-user-index',
        'KeyConditionExpression': "event = :e",
        //'ExpressionAttributeNames': {
        //  '#eventId': 'eventId',
        //},
        'ExpressionAttributeValues': {
            ':e': event
        },
        'ScanIndexForward': false
        }).promise().then((data) => {
            resolve(data.Items);
        }).catch((err) => {
            console.log(err);
        });
    })
  }

}
