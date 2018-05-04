import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css']
})
export class VideoCenterComponent implements OnInit {

    constructor(private vs: VideoService) { }

    selectedVideo: Video;
    videos : Video[] = [];
    hideNewVid : boolean = true;


    onSelectVideo(video: any){
      this.selectedVideo = video;
      this.hideNewVid = true;
    }

    ngOnInit() {
      this.getVideos();
      this.selectedVideo = this.videos[0];
    }

    newVideo(){
      this.hideNewVid = false;
    }

    getVideos(){
      this.vs.getVideos().subscribe(resVid => this.videos = resVid);
    }

    onSubmitAddVideo(vid : Video){
      this.vs.addVideo(vid)
        .subscribe(nwVid=> {
          this.videos.push(nwVid);
          this.hideNewVid = true;
          this.selectedVideo = nwVid;
        });
    }

    onUpdateVideoEvent(vid : any){
      this.vs.updateVideo(vid)
        .subscribe(nwVid=> {
          vid = nwVid;
          this.selectedVideo = nwVid;
        });
    }

    onDeleteVideoEvent(vid : any){
      this.vs.deleteVideo(vid)
        .subscribe(nwVid=> {
          // vid = nwVid;
          this.getVideos();
          this.selectedVideo = null;
        });
    }

}
