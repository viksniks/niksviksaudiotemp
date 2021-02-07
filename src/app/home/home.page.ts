import { Component } from '@angular/core';
import {Media,MediaObject} from "@ionic-native/media/ngx";
import {File} from "@ionic-native/file/ngx";
import {LoadingController} from "@ionic/angular"
import {Base64} from "@ionic-native/base64/ngx";

import {HttpClient, HttpHeaders} from "@angular/common/http"

import {Base64ToGallery,Base64ToGalleryOptions} from "@ionic-native/base64-to-gallery/ngx";
import { FileOpener } from '@ionic-native/file-opener/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  status:string="";
  audioFile:MediaObject;
  urls:string[] = [];
  hours:string="0";
  minutes:string="0";
  seconds:string="0";
  intervalId:any;
  mediaPath:string="";
  iconname:string="play-circle-outline";
  audioFileTemp:Blob;
  audioName:string="";
  apiurl:string="";
  room:string="";
  session:string="";
  //<ion-icon name="pause-circle-outline"></ion-icon>
  constructor(private media:Media,private file:File,private base64:Base64,private basetogallery:Base64ToGallery,private opener:FileOpener,private httpClient:HttpClient)
  {

  }
  ngOnInit()
  {
    
  }
  playMedia()
  {
    
    this.opener.showOpenWithDialog(this.mediaPath,"audio/wav");
  }
 
  showTimer()
  {
    
    var now = new Date().getTime();
    // Update the count down every 1 second
    this.intervalId = setInterval(()=>{

    
    
      // Get today's date and time
      var countDownDate = new Date().getTime();
    
      // Find the distance between now and the count down date
      var distance = countDownDate - now;
    
      // Time calculations for days, hours, minutes and seconds
      //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = (Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).toString();
      this.minutes = (Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).toString();
      this.seconds = (Math.floor((distance % (1000 * 60)) / 1000)).toString();
    
      
     
    }, 1000);
  }

  RecordAudio()
  {
    if(this.iconname == "stop-circle-outline")
    {
      this.StopRecording();
      return;
    }
    this.audioName = Date.now().toString()+".wav";
    this.mediaPath = this.file.externalRootDirectory+'/'+this.audioName;
    this.audioFile = this.media.create(this.mediaPath);
   this.audioFile.startRecord();
   this.showTimer();
   this.iconname = "stop-circle-outline";
  }
pauseRecording()
{
  this.audioFile.pauseRecord();
}
resumeRecording()
{
  this.audioFile.resumeRecord();
}

  StopRecording()
  {
    this.audioFile.stopRecord();
    this.hours = "0";
    this.minutes = "0";
    this.seconds = "0";
    this.stopTimer();
    this.iconname = "play-circle-outline";
    //this.playMedia();
    this.file.readAsArrayBuffer(this.file.externalRootDirectory,this.audioName).then((res)=>{
      this.audioFileTemp = new Blob([res], {type: "audio/wav"})
    })


  
   
   
    
  }
  stopTimer()
  {
    clearInterval(this.intervalId);
  }


  callAPI()
  {
  //   var url = "";
  //   var dataToSend={};
  //  this.http.post(url,dataToSend,{ "Content-Type": "application/json"}).then((data)=>{
  //    //datareceived from api
  //  },(err)=>{
  //    alert(JSON.stringify(err));
  //  })
  let form = new FormData();
  // alert(this.audioFileTemp);
  // alert(this.audioName);
  // alert(this.room);
  // alert(this.session);
  // alert(this.apiurl);
  form.append("audio",this.audioFileTemp);
  form.append("Audio_name",this.audioName);
  form.append("room",this.room);
  form.append("sessionID",this.session);

  
  
  let headers: any = new HttpHeaders({'Content-Type': 'multipart/form-data'}),
     
      url: any = this.apiurl;

    this.httpClient.post(url,form,{headers:headers}).subscribe((res)=>{
      alert(JSON.stringify(res));
    },(err)=>{
      alert(JSON.stringify(err));
    })

  }
  

 
  
}
