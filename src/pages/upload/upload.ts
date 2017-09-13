import { Component, ViewChild } from '@angular/core';

import { Config, LoadingController, NavController, ToastController, AlertController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { DynamoDB, User } from '../../providers/providers';
import { Events } from '../../providers/events';
import { UserData } from '../../providers/user-data';


declare var AWS: any;
declare const aws_user_files_s3_bucket;
declare const aws_user_files_s3_bucket_region;

@Component({
  selector: 'upload',
  templateUrl: 'upload.html'
})
export class UploadPage {

  @ViewChild('picture') pictureInput;

  private s3: any;
  public pictureUrl: string;
  public selectedPhoto: Blob;
  public attributes: any;
  public sub: string = null;
  public currentInning: any;
  public currentEvent: string;
  public name: string = 'Loading...';
  public description: string = 'Loading...';
  private photoTable: string = 'bftbs-photos';
  public photoSubmitted: boolean = false;

  constructor(public navCtrl: NavController,
              public user: User,
              public db: DynamoDB,
              public config: Config,
              private toastCtrl: ToastController,
              public camera: Camera,
              public userData: UserData,
              public events: Events,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
    this.attributes = [];
    this.pictureUrl = null;
    this.selectedPhoto = null;
    
    this.s3 = new AWS.S3({
      'params': {
        'Bucket': aws_user_files_s3_bucket
      },
      'region': aws_user_files_s3_bucket_region
    });
    this.sub = AWS.config.credentials.identityId;
    this.refreshInning();
    

  }

  changeInning() {
    this.userData.nextInning();  
    this.refreshInning();
    this.photoSubmitted = false;

  }


  refreshInning() {
    this.events.refreshData().then(() => {
      let currentInning = this.events.getInningEvent(this.userData.getInning());
      this.currentInning = this.userData.getInning();
      this.name = currentInning.name;
      this.description = currentInning.description;
      this.currentEvent = currentInning.id;
      this.events.setActiveEvent(this.currentEvent);
    })

  }

  dataURItoBlob(dataURI) {
    // code adapted from: http://stackoverflow.com/questions/33486352/cant-upload-image-to-aws-s3-from-ionic-camera
    let binary = atob(dataURI.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
  };


  generateId() {
    var len = 16;
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charLength = chars.length;
    var result = "";
    let randoms = window.crypto.getRandomValues(new Uint32Array(len));
    for(var i = 0; i < len; i++) {
      result += chars[randoms[i] % charLength];
    }
    return result.toLowerCase() + '-' + this.user.getUsername() + '-' + this.currentEvent;
  }

  zzselectPicture() {
    this.showConfirmation();
  }
  selectPicture() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 200,
      targetWidth: 200,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.selectedPhoto  = this.dataURItoBlob('data:image/jpeg;base64,' + imageData);
      this.upload();
    }, (err) => {
      //console.info(err);
      this.pictureInput.nativeElement.click();
      // Handle error
    });
  }

  uploadFromFile(event) {
    const files = event.target.files;
    console.log('Uploading', files)
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.selectedPhoto = this.dataURItoBlob(reader.result);
      this.upload();
    };
    reader.onerror = (error) => {
      alert('Unable to load file. Please try another.')
    }
  }


  showConfirmation() {
    this.photoSubmitted = true;
    let alert = this.alertCtrl.create({
      title: 'Success!',
      subTitle: 'Your photo has been submitted for this inning. Good Luck!',
      buttons: ['OK']
    });
    alert.present();
  }

  upload() {
    let loading = this.loadingCtrl.create({
      content: 'Sending photo...'
    });
    loading.present();

    if (this.selectedPhoto) {
      let id = this.generateId();
      let route = 'public/' + this.sub + '/' + id;
      this.s3.upload({
        'Key': route,
        'Body': this.selectedPhoto,
        'ContentType': 'image/jpeg'
      }).promise().then((data) => {
        this.showConfirmation();
        console.log('upload complete:', data);
        this.db.getDocumentClient().put({
          'TableName': this.photoTable,
          'Item': { id: id, event: this.events.getActiveEventId(), user: this.user.getUsername(), url: data.Location, created: new Date().getTime() },
          'ConditionExpression': 'attribute_not_exists(id)'
        }, (err, data) => {
          if (err) { console.log(err); }
        });
        loading.dismiss();
      }, err => {
        console.log('upload failed....', err);
        loading.dismiss();
      });
    }
  }
}
