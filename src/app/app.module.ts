import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListMemberComponent } from './list-member/list-member.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { FacedetectComponent } from './facedetect/facedetect.component';

@NgModule({
  declarations: [
    AppComponent,
    ListMemberComponent,
    FacedetectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpModule
   


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
