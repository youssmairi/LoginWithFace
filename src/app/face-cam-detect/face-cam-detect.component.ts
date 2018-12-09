import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireUploadTask } from '@angular/fire/storage';
import { FaceRecognitionService } from './face-recognition.service';

@Component({
  selector: 'app-face-cam-detect',
  templateUrl: './face-cam-detect.component.html',
  styleUrls: ['./face-cam-detect.component.css']
})
export class FaceCamDetectComponent implements OnInit {

  dataUri;
  faceData:any=[];
  img64;
  singlePerson= true;
  personNumber;
  firtPerson;
  @ViewChild("video")
    public video: ElementRef;

    @ViewChild("canvas")
    public canvas: ElementRef;

    public captures: Array<any>;

    

  public constructor(public cam : FaceRecognitionService  ) { 
    this.captures = [];
  }

  ngOnInit() {

    
  }

  public ngAfterViewInit() {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
            this.video.nativeElement.src = window.URL.createObjectURL(stream);
            this.video.nativeElement.play();
        });
    }
}

public capture() {
    var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.dataUri= this.canvas.nativeElement.toDataURL("image/png");
    //this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
}




public getData(){
  this.cam.scanImage(this.dataUri).subscribe(
    data=>{this.faceData = data.json(); 
      console.log(this.faceData);
      console.log(this.faceData.length);
      if (this.faceData.length===1){
        this.singlePerson=true;
        console.log(this.singlePerson);
      }
     
      else  {
        this.singlePerson=false;
        console.log(this.singlePerson)
      }
      this.personNumber= this.faceData.length;
      console.log(this.personNumber);
})
}
}
