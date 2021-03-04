var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');
var monk = require('monk');
var db = monk('localhost:27017/vidzy');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('header', { title: 'Express' });
});

// router.get('/', function(req, res, next) {
//   res.redirect('/videos');
// });

// router.get('/',function(req, res, next) {
//   //console.log(res);
//   // console.log('req locals: ',req.app.locals);
//   // console.log('req error: ',req.app.error);
//   // console.log('req user: ',req.app.user);
//   if(req.error){
//     res.locals.error = req.error;
//   }
//   if(req.user){
//     // console.log(req.user);
//     res.locals.user = req.user;
//   }
//  // res.locals.title = 'Online Merchandise';
//   res.render('header',{ title: 'Express' });
  
// });

router.post('/', auth,function(req, res, next) {
  if(req.error){
    res.locals.error = req.error;
  }
  if(req.user){
    // console.log(req.user);
    res.locals.user = req.user;
  }
  res.locals.title = 'Online Merchandise';
  res.render('index');
  
});




router.get('/videos', function(req, res) {
	var collection = db.get('videos');
  if(!req.query.genre&&!req.query.title){
    collection.find({}, function(err, videos){
        if (err) throw err;
          res.render('index', { videos: videos });
    });
}else{
    if(req.query.genre=="none"){
        collection.find({title:new RegExp(req.query.title,'i')}, function(err, videos){
            if (err) throw err;
            res.json({ videos: videos });
        });
    }else{
        collection.find({title:new RegExp(req.query.title,'i'), genre:req.query.genre}, function(err, videos){
            if (err) throw err;
            res.json({ videos: videos });
        });
    }
}
});

//new video
router.get('/videos/new', function(req, res) {
	res.render('new');
});


//insert route
router.post('/videos', function(req, res){
  var collection = db.get('videos');
  collection.insert({
      title: req.body.title,
      genre: req.body.genre,
      image: req.body.image,
      description: req.body.desc
  }, function(err, video){
      if (err) throw err;

      res.redirect('/videos');
  });
});

router.get('/videos/:id', function(req, res) {
	var collection = db.get('videos');
	collection.findOne({ _id: req.params.id }, function(err, video){
		if (err) throw err;
	  	//res.json(video);
	  	res.render('show', { video: video });
	});
});

router.get('/videos/:id/edit', function(req, res) {
  var collection = db.get('videos');
	collection.findOne({ _id: req.params.id }, function(err, video){
		if (err) throw err;
	  	//res.json(video);
	  	res.render('edit', { video: video });
	});
});

//update route
router.put('/videos/:id', function(req, res){
  var collection = db.get('videos');
  collection.findOneAndUpdate({ _id: req.params.id }, {
        
    $set: {
      title: req.body.title,
      genre: req.body.genre,
      image: req.body.image,
      description: req.body.desc
    }
},function(err, video) {
    res.redirect('/videos');
});

});

//delete route
router.delete('/videos/:id', function(req, res){
  var collection = db.get('videos');
  collection.remove({ _id: req.params.id }, function(err, video){
      if (err) throw err;

      res.redirect('/');
  });
});

module.exports = router;
