var express          = require("express"),
    bodyParser       = require("body-parser");   
var request          = require("request");
 
var app = express();

app.set("view engine","ejs");
app.use('/public',express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.render("landing");
})

app.get("/user",function(req,res){
    
})

app.post("/user",function(req,res){
    console.log(req.body.username);
    request("https://www.instagram.com/"+req.body.username+"/?__a=1",function(err,response,body){
        if(!err && response.statusCode==200){
            result = JSON.parse(body); 
            //res.json(result) ;
            res.render("user",{user:result});
        }
        else{
            res.render("not_found");
        }
    });
})

app.listen(process.env.PORT||8000,function(){
    console.log("server started");
})