import { Injectable } from '@angular/core';
import { DynamoDB } from './aws.dynamodb';

@Injectable()
export class Photos {

  private photosTable: string = 'bftbs-photos';
  private voteTable: string = 'bftbs-votes';

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

  getPhotosForUser(user) {
    return new Promise((resolve, reject) => {

        this.db.getDocumentClient().scan({
        'TableName': this.photosTable,
        'FilterExpression':'#user = :u',        
        'ExpressionAttributeNames': {
          '#user': 'user',
        },        
        'ExpressionAttributeValues': {
            ':u': user
        },        
        'ScanIndexForward': false
        }).promise().then((data) => {
            resolve(data.Items);
        }).catch((err) => {
            console.log(err);
        });
    })
  }

  getUserVotes(user, event) {
    return new Promise((resolve, reject) => {

        this.db.getDocumentClient().scan({
        'TableName': this.voteTable,
        //'IndexName': 'bftbs-photos-id-user-index',
        'FilterExpression': "#usr = :u and contains(#event, :e)",
        'ExpressionAttributeNames': {
          '#usr': 'username',
          '#event': 'photoId',
        },
        'ExpressionAttributeValues': {
					':u': user,
					':e': '-' + event
        },
        'ScanIndexForward': false
        }).promise().then((data) => {
            resolve(data.Items);
        }).catch((err) => {
            console.log(err);
        });
    })
  }

  getVoteCountForPhoto(photoId) {
    return new Promise((resolve, reject) => {

        this.db.getDocumentClient().query({
        'TableName': this.voteTable,
        //'IndexName': 'bftbs-photos-id-user-index',
        'KeyConditionExpression': "photoId = :p",
        //'ExpressionAttributeNames': {
        //  '#eventId': 'eventId',
        //},
        'ExpressionAttributeValues': {
            ':p': photoId
        },
				'Select': 'COUNT'
        }).promise().then((data) => {
            resolve(data.Count);
        }).catch((err) => {
            console.log(err);
        });
    })
  }
  unvote(photoId, user) {
    return new Promise((resolve, reject) => {
        this.db.getDocumentClient().delete({
        'TableName': this.voteTable,
        'Key': {
            'photoId': photoId, 
            'username': user
        }
        }).promise().then((data) => {
            resolve(data)
            //this.items.splice(index, 1);
        }).catch((err) => {
            reject(err);
            console.log('there was an error', err);
        });
    })
  }

  vote(photoId, user) {
    let id = photoId + '-' + user;
    return new Promise((resolve, reject) => {
        this.db.getDocumentClient().put({
            'TableName': this.voteTable,
            'Item': { photoId: photoId, id: id, username: user, created: new Date().getTime() },
            'ConditionExpression': 'attribute_not_exists(id)'
        }, (err, data) => {
            if (err) { 
                console.log(err);
                reject(err);
             } else {
                resolve(data);
             }
        });
    })
  }

}
