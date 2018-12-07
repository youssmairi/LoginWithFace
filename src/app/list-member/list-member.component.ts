import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { map, finalize } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-list-member',
  templateUrl: './list-member.component.html',
  styleUrls: ['./list-member.component.css']
})
export class ListMemberComponent implements OnInit {
  data: any;
  items: Observable<any[]>;
  itemsRef: AngularFireList<any>;
  uploadPercent: Observable<number>;
  downloadURL: string;

  constructor(db: AngularFireDatabase, private storage: AngularFireStorage) {
    this.itemsRef = db.list('users');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

  }

  onSubmit(f: NgForm) {

    this.data = {
      nom: f.value.nom,
      prenom: f.value.prenom,
      tel: f.value.tel,
      imageUrl: f.value.imageUrl
    }
    this.itemsRef.push(this.data)
  
  }

  onDelete(key) {
    const result = confirm("Confirmez la suppression ?")
    if (result) {
      this.itemsRef.remove(key);
    }

  }

  fileurl;

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath =  Math.random().toString(36).substring(2);; 
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file).then(() => {


      fileRef.getDownloadURL().subscribe(url => this.downloadURL = url)

      // observe percentage changes
      // this.uploadPercent = task.percentageChanges();
      // get notified when the download URL is available
      // task.snapshotChanges().pipe(
      //   finalize(() => {
      //     this.fileurl = fileRef.getDownloadURL();
      //     fileRef.getDownloadURL()
      //     console.log(this.downloadURL);

      //   })
      // )

      // .subscribe()
    });
  }



  ngOnInit() {

  }

}
