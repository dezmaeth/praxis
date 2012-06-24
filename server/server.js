var port = (process.argv[2] !== undefined)?  process.argv[2]: 3000;

var app = require(__dirname + '/app').init(port);

var querys = require(__dirname + '/db').querys();

var locals = {
        title: 		 'Praxis',
        description: 'description',
        author: 	 'Francisco Javier Henseleit Palma',
        company: 	 'MCAST'
    };


/***************************
Request / Response Listeners 
****************************/

app.get('/', function(req,res){
    locals.date = new Date().toLocaleDateString();
    res.render('home.ejs', locals);
});

//mongo database interface :)
/*
app.get('/marker/list.json',querys.getMarkerList);
*/

/* The 404 Route (ALWAYS Keep this as the last route) */
app.get('/*', function(req, res){
    res.render('404.ejs', locals);
});