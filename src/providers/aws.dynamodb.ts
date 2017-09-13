import { Injectable } from '@angular/core';

declare var AWS: any;

@Injectable()
export class DynamoDB {

  private documentClient: any;

  constructor() {
    this.documentClient = new AWS.DynamoDB.DocumentClient();
  }

  getDocumentClient() {
    return this.documentClient;
  }

  decodeTypedDynamoResult(result) {
    for (let prop in result) {
      result[prop] = result[prop].S || result[prop].N || result[prop].B || result[prop].BOOL || 
                        result[prop].BS || result[prop].NS || result[prop].SS || (result[prop].NULL && null) || (result[prop].M && this.decodeTypedDynamoResult(result[prop].M));
    }
    return result;
  }

}
