import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { UploadPage } from '../pages/upload/upload';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ConfirmPage } from '../pages/confirm/confirm';
import { SettingsPage } from '../pages/settings/settings';
import { AboutPage } from '../pages/about/about';
import { AccountPage } from '../pages/account/account';
import { TabsPage } from '../pages/tabs/tabs';
import { TasksPage } from '../pages/tasks/tasks';
import { LeaderboardPage } from '../pages/leaderboard/leaderboard';
import { LeaderboardPicsPage } from '../pages/leaderboardpics/leaderboardpics';
import { TasksCreatePage } from '../pages/tasks-create/tasks-create';
import { VotePage } from '../pages/vote/vote';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { UserData } from '../providers/user-data';
import { User } from '../providers/user';
import { Cognito } from '../providers/aws.cognito';
import { DynamoDB } from '../providers/aws.dynamodb';
import { Events } from '../providers/events';
import { Photos } from '../providers/photos';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    VotePage,
    SignupPage,
    UploadPage,
    ConfirmPage,    
    SettingsPage,
    LeaderboardPage,
    LeaderboardPicsPage,
    AboutPage,
    AccountPage,
    TabsPage,
    TasksPage,
    TasksCreatePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    UploadPage,
    VotePage,
    SignupPage,
    LeaderboardPage,
    LeaderboardPicsPage,
    ConfirmPage,
    SettingsPage,
    AboutPage,
    AccountPage,
    TabsPage,
    TasksPage,
    TasksCreatePage
  ],
  providers: [
    UserData,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    User,
    Cognito,
    DynamoDB,
    Events,
    Photos
  ]
})
export class AppModule {}

declare var AWS;
AWS.config.customUserAgent = AWS.config.customUserAgent + ' Ionic';
