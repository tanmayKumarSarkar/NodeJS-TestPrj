import { Component, OnInit, EventEmitter } from '@angular/core';
import { Video } from '../video';

@Component({
  selector: 'video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
  inputs: ['videos'],
  outputs: ['selectVideo']
})
export class VideoListComponent implements OnInit {

  constructor() { }
  public selectVideo = new EventEmitter();

  ngOnInit() {
  }

  onSelect(vid: Video){
    this.selectVideo.emit(vid);
    }

}
