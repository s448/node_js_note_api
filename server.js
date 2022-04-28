var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var route = require('./router/route')
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/api/v1',route)

app.get('/',(req,res)=>{
    res.send('server started successfully');
});

app.listen(3000,(req,res)=>{
    console.log('server starting........');
});
