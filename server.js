// load the express package and create our app
var express = require('express'),
	googleapis = require('googleapis'),
	app = express(),
	youtubeClient = null,
	VALID_ORDER_CRITERIA = ['date', 'rating', 'relevance', 'title', 'videoCount', 'viewCount'], 
	API_KEY = 'AIzaSyAN7FiXp7dJrN8-0uMGXQhOvE6sWDJBj2g';
	MAX_LIMIT = 25;
	
var app = express();
var path = require('path');
var youtubeClient = null;

app.use(express.static(__dirname+'/'));

googleapis.options ({ auth: API_KEY });
var youtube = googleapis.youtube ('v3');

app.get('/:artist',function(req,res){
        
  youtube.search.list(
        {
         part: 'snippet',
         q: req.params.artist,
		 maxResults: MAX_LIMIT,
         type: 'video',
		 //order: 'relevance',
         videoEmbeddable: true
        },
        function(err,result){
                if(err)
                        console.log(err);
                else{
						var results = [];
                        for(var i=0;i<MAX_LIMIT;i++) {
                            var item = result.items[i];
                            var resultArray= { };
							resultArray.videoId = item.id.videoId;
                            resultArray.title = item.snippet.title;
							resultArray.thumbnail = item.snippet.thumbnails.medium;
                            results.push(resultArray);
                        }
                       
                        console.log(JSON.stringify(results,null,2));
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify(results,null,2));
						
                }

        });
});

 // send our index.html file to the user for the home page
app.get('/', function(req, res) {
res.sendFile(path.join(__dirname + '/index.html'));
});

// start the server
app.listen(1337);
console.log('1337 is the magic port!');
 