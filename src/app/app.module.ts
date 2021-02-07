import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {Media} from "@ionic-native/media/ngx";
import {File} from "@ionic-native/file/ngx";
import {Base64} from "@ionic-native/base64/ngx";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
import {Base64ToGallery} from "@ionic-native/base64-to-gallery/ngx";
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import {HttpClientModule} from "@angular/common/http"

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,HttpClientModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Media,
    File,
    AndroidPermissions,
    Base64,
    Base64ToGallery,
    FileOpener,
    HTTP
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
