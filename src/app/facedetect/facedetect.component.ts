import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { VerifyService } from '../verify.service';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { map, finalize } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import {ListMemberComponent} from '../list-member/list-member.component';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';




@Component({
  selector: 'app-facedetect',
  templateUrl: './facedetect.component.html',
  styleUrls: ['./facedetect.component.css']
})
export class FacedetectComponent implements OnInit {

  imageUrl1: string;
  imageUrl2: string;
  personnes1: any = [];
  personnes2: any = [];
  comparisation: any = [];
  N_requestVerify;

  @ViewChild("visualization") visualization: ElementRef;
  @ViewChild('img') img: ElementRef;

  @ViewChild("video")
  public video: ElementRef;

  @ViewChild("canvas")
  public canvas: ElementRef;

  @ViewChild("visualization2") visualization2: ElementRef;
  @ViewChild('img2') img2: ElementRef;

  private context: CanvasRenderingContext2D;
  private element: HTMLImageElement;

  private context2: CanvasRenderingContext2D;
  private element2: HTMLImageElement;

  photo;
  src: string;
  src2: string;
  imgWidth: number;
  imgHeight: number;
  raduis: number;
  isIdentical;
  personTrue;
  j;
  compIdFace;
  IdFace1: string;
  IdFace2: string;
  imgTab: any = [];
  items: Observable<any[]>;
  itemsRef: AngularFireList<any>;
  NbrUser;



  constructor(private dataService: DataService, private dataVerify: VerifyService, public router:Router ,db: AngularFireDatabase, private storage: AngularFireStorage) {
   
    this.itemsRef = db.list('users');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    
   
   
   
    this.src2 = 'https://media.glamour.com/photos/5a425fd3b6bcee68da9f86f8/master/w_644,c_limit/best-face-oil.png';
    this.src = 'http://coolstyle.ba/wp-content/uploads/2018/08/ljetovanje1.jpg';
    this.imgWidth = 300;
    this.imgHeight = 200;
    this.imgTab = [this.src2,
       "https://bilderim.com/wp-content/uploads/2017/11/dd.jpg",
      "https://media.glamour.com/photos/5a425fd3b6bcee68da9f86f8/master/w_644,c_limit/best-face-oil.png",
      "https://i.wpimg.pl/O/644x429/d.wpimg.pl/1418456432--926698008/twarz-kobiety.jpg",
      "https://uploads.metropoles.com/wp-content/uploads/2017/04/02090644/capa-840x577.jpg",
      "https://image.shutterstock.com/image-photo/beauty-face-woman-healthy-skin-260nw-1160292994.jpg"];


  }

  /*ngAfterViewInit() {

    


    this.context = this.visualization.nativeElement.getContext("2d");
    this.element = this.img.nativeElement;

    this.context2 = this.visualization2.nativeElement.getContext("2d");
    this.element2 = this.img2.nativeElement;
    // this.raduis = this.element.height/this.element.width;

    // this.imgHeight = this.raduis * this.imgWidth;



  }*/


  afterLoading() {

    this.element = this.img.nativeElement;
    this.element2 = this.img2.nativeElement


    console.log('raduis est' + this.raduis);
    console.log("largeur de l'img :" + this.element.width);
    console.log("hauteur de l'img :" + this.element.height);




    this.context.clearRect(0, 0, this.imgWidth, this.imgHeight);
    console.log('drawImage');
    // this prints an image element with src I gave
    console.log(this.element);
    this.context.drawImage(this.element, 0, 0, this.imgWidth, this.imgHeight);

    this.context2.clearRect(0, 0, this.imgWidth, this.imgHeight);
    console.log('drawImage');
    // this prints an image element with src I gave
    console.log(this.element2);
    this.context2.drawImage(this.element2, 0, 0, this.imgWidth, this.imgHeight);

  }

  verifyTwoId(id1, id2) {
   

  

    this.dataVerify.verifyPersonne(id1, id2).subscribe(data => {

      this.comparisation = data.json();
      

      this.compIdFace=(this.compIdFace||this.comparisation.isIdentical);
      
      
      if (this.comparisation.isIdentical) {
        this.router.navigate(["accessDone"])
      } else if ((this.N_requestVerify===this.NbrUser)) {
        this.router.navigate(["signup"])
      }
      console.log("connexion  "+this.comparisation.isIdentical);
      console.log("nbr Request  "+this.N_requestVerify);
      console.log("nbr user  "+this.NbrUser);
      this.N_requestVerify++;
      
    });

   

  }

  verify_Id_Src(id1, src2) {

    this.dataService.getPersonne(src2).subscribe(data => {

      this.personnes2 = data.json();

      const id2 = this.personnes2[0].faceId;

      console.log('id des visages est (getperson) ' + id2);

      this.verifyTwoId(id1, id2);

    });
  }


  verifyPersonne(src, src2: string) {

    
    this.dataService.getPersonne(src).subscribe(data => {

      this.personnes1 = data.json();

      let id1 = this.personnes1[0].faceId;

      console.log('id des visages est (getperson) ' + this.IdFace1);

      this.verify_Id_Src(id1, src2);

    });

  }

  verifyTabImg() {

    
    this.picImgCam();

    this.dataService.getPersonneCam(this.photo).subscribe(data =>
      {
        this.N_requestVerify= 1;
        let personne = data.json();
        let id       = personne[0].faceId;
        console.log(personne)
        this.items.forEach((item: any) =>{
          this.NbrUser = item.length
          for (let index = 0; index < item.length; index++) {
            const img = item[index].imageUrl;
            this.verify_Id_Src(id,img); 
            
            
            
            
          }
        });
        
        /**/
      });
      

  }

 

  public ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      });
    }

  }
  
  picImgCam(){

    var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.photo = (this.canvas.nativeElement.toDataURL("image/png"));
    this.video.nativeElement.pause();
  }



  ngOnInit() {
    

  }

}
