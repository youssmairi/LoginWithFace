import { Injectable } from '@angular/core';
import { Http , Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

   id : string;

  private url = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,smile,gender';
  
  constructor(private http : Http) { }

   getPersonne(imageUrl : string){
    
    const headers = new Headers ({'Content-Type':'application/json',
    'Ocp-Apim-Subscription-Key':'34600182027a455e900e027661b3b31b'}) ;
    const options = new RequestOptions ({headers});
    return  this.http.post(this.url,{url : imageUrl},options)
    
    


  }

  getPersonneCam(base64Image: string) {
    const headers = new Headers
      ({
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': '34600182027a455e900e027661b3b31b'
      });
    const options = new RequestOptions({ headers });
    const Blob = this.makeblob(base64Image);
    console.log(Blob);
    this.url = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?FaceId=true';
    return this.http.post(
      this.url, Blob, options
    )





  }
  private makeblob(dataURL) {
    const BASE64_MARKER = ';base64,';
    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }

}
