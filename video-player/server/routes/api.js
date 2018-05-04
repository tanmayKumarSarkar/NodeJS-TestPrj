const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');

const db = "mongodb://username:password@ds263639.mlab.com:63639/tan-videoplayer";
mongoose.Promise = global.Promise;

mongoose.connect(db, (err)=>{
  if(err) console.log("Error!",err);
});

router.get('/videos', (req, res)=>{
  Video.find({})
    .exec((err, videos)=>{
      if(err) throw err;
      res.json(videos);
    });
});

router.get('/videos/:id', (req, res)=>{
  /*Video.findById(req.params.id)
    .exec((err, video)=>{
      if(err) throw err;
      res.json(video);
    });*/

    Video.findById(req.params.id, (err, video)=>{
      if(err) throw err;
      res.json(video);
    });
});

router.post('/video', (req, res)=>{
  /*let nwVideo = new Video();
  nwVideo.title = req.body.title;
  nwVideo.url = req.body.url;
  nwVideo.description = req.body.description;*/
  let nwVideo = new Video(req.body);
  nwVideo.save((err,video)=>{
    if(err) throw err;
    res.json(video);
  });
/*  Video.create(req.body, (err, video)=>{
    if(err) throw err;
    res.json(video);
  });*/
});

router.put('/video/:id', (req, res)=>{
  Video.findByIdAndUpdate(req.params.id, {$set: req.body}, {}, (err,video)=>{
    if(err) throw err;
    res.json(video);
  });
});

router.delete('/video/:id', (req, res)=>{
  Video.findByIdAndRemove(req.params.id, (err,video)=>{
    if(err) throw err;
    res.json(video);
  });
});

module.exports = router;
