let express = require('express');
let todoController = require('./controllers/todoController.js');

let app = express();

// set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire controllers
todoController(app);


//listen on port 3000
app.listen(3000);
console.log("Running...")