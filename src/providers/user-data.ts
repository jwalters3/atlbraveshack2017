import { Injectable } from '@angular/core';


@Injectable()
export class UserData {
  inning: any = 1;
  
  constructor(
    
  ) {}

  getInning() {
      return this.inning;
  }
  setInning(inning) {
      this.inning = inning;
  }
  
  nextInning() {
      this.inning++;
  }


}