let bodyParser = require('body-parser');
let mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb+srv://ishh:shhh@cluster0.txr88.mongodb.net/TodoApp?retryWrites=true&w=majority');

//Create a schema - this is like a blueprint
let todoSchema = new mongoose.Schema({
    item: String
});

//create model
let Todo = mongoose.model('Todo', todoSchema);

// let itemOne = Todo({item: 'buy flowers'}).save(function(err){
//     if(err) throw err;
//     console.log("item Saved");
// });


// let data = [{item: 'get milk'}, {item: 'go for walk'}, {item: 'drink water'}];

module.exports = function(app){

    let urlencodedParser = bodyParser.urlencoded({extended: false});

    //home page
    app.get('/', function(req, res){
        res.render('index');
    });
    
    //GET
    app.get('/todo', function(req, res){
        //get data from mongodb and pass it to view
        Todo.find({}, function(err, data){
            if(err) throw err;
            res.render('todo', {todos: data});
        })
        // res.render('todo', {todos: data});
    });

    //POST
    app.post('/todo', urlencodedParser, function(req, res){
        // get data from the view and add it to mongodb
        let newTodo = Todo(req.body).save(function(err, data){
            if(err) throw err;
            res.json(data);
        })
        // data.push(req.body);
        // res.json({todos: data});
    });

    //DELETE
    app.delete('/todo/:item', function(req, res){
        // delete the requested item form mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).deleteOne(function(err, data){
            if(err) throw err;
            res.json(data);    
        });
        // data = data.filter(function(todo){
        //     return todo.item.replace(/ /g, "-") !== req.params.item;
        // });
        // res.json(data);
    });
}