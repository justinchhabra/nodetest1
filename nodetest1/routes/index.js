var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("inside get route")
  res.render('index', { title: 'Express' });
});

router.post('/update/', function(req, res) {
	console.log("inside update route2");
	//console.log("req", req)

	var db = req.db;
	var itemJsonArray = req.body;
	console.log("itemJsonArray", itemJsonArray)
	//res.send('inside update route');
	var message = {};

	//var listItems = {};
	//listItems.name = "test";

	var response = {};

	var collection = db.get('listItems');

	collection.remove({}, function(err, result){
			if(err){
				console.log("error delete Items")
			}
			else{
				console.log("items deleted successfully")

				collection.insert(itemJsonArray, function(err, result){
			        if (err){
			            response.status = 'failure';
			            response.message = err;
			            console.log("Error from route", err);
			            res.json(response);
			        } else {
						console.log("insert from route success")
						response.status = 'success';
			            response.message = 'insert success';
			        	res.json(response);
			        }
			    });
			}
			
		}
	);

	
	//message.
	
});


router.get('/getItems/', function(req, res, next) {
	var db = req.db;
    var collection = db.get('listItems');

    collection.find({},{},function(e,items){
        console.log("items", items);
        res.json(items)
    });
});

module.exports = router;
