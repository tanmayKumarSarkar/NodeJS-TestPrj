import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Video } from './video';

@Injectable()
export class VideoService {

  constructor(private http: Http) { }

  apiUrl: string = 'http://localhost:3000' || '';

  getVideos(){
      return this.http.get(this.apiUrl+'/api/videos')
        .map((res: Response)=> res.json());

      // return this.http.get('http://localhost:3000/api/videos')
      //   .map((res: Response)=> res.json()
      //   .subscribe(resVid => this.videos = resVid));
      //   //.subscribe((res: Response) => console.log(res.json()));
  }

  addVideo(vid: Video){
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(`${this.apiUrl}/api/video`, JSON.stringify(vid), options)
      .map((res: Response)=> res.json());
  }

  updateVideo(vid: Video){
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(`${this.apiUrl}/api/video/${vid._id}`, JSON.stringify(vid), options)
      .map((res: Response)=> res.json());
  }

  deleteVideo(vid: Video){
    return this.http.delete(`${this.apiUrl}/api/video/${vid._id}`)
      .map((res: Response)=> res.json());
  }

}
