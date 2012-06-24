var mongo = require('mongodb'),Server = mongo.Server, Db = mongo.Db;
var _querys = {};

exports.querys = function () {

	_querys.getMarkerList = function(req,res) {
		/*
		var client = new Db('fixthis', new Server("localhost", 27017, {}));
		client.open(function (error, client) {
			if (error) throw error;
			var collection = new mongo.Collection(client, 'places');
			res.setHeader("Content-Type", "application/json");

			collection.find().toArray(function(err, docs) {
				if (err) throw error;
    			res.send(docs);
    			res.end();
    			client.close();
  			});
		});*/
	};

	return _querys;
};