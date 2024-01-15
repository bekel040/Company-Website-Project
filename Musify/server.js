const express = require('express')
const { contentType } = require('express/lib/response')
const app = express()
const port = 4131
const basicAuth = require('express-basic-auth')

const {
  addContact,
  getContacts,
  deleteContact,
  addSale,
  endSale,
  getRecentSales
} = require('./data.js');



app.set("views", "templates");
app.set("view engine", "pug");

app.use("/css", express.static("resources/css"));
app.use("/js", express.static("resources/js"));
app.use("/images", express.static("resources/images"));

app.use("/admin/css", express.static("resources/css"));
app.use("/admin/js", express.static("resources/js"));



app.use(express.urlencoded({ extended: true }))
app.use(express.json())


const authorizeMiddleware = basicAuth({
    users: {'admin': 'password'},
    challenge: true,
    realm: 'User Visible Realm',
    unauthorizedResponse: 'restricted'


})


app.use((req,res,next) => {
    console.log('✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰');
    console.log(`Requested Method: ${req.method}`);
    console.log(`Requested URL: ${req.url}`);

    oldEnd = res.end;


    res.end = function () {
        console.log(`Status code: ${res.statusCode}`);

        oldEnd.apply(res, arguments);


    };

    next();

})



app.get('/', (req , res) => {
    res.render("mainpage.pug")

})
app.get('/main', (req , res) => {
    res.render("mainpage.pug")

})
app.get('/testimonies', (req , res) => {
    res.render("testimonies.pug")

})
app.get('/contact', (req , res) => {
    res.render("contactform.pug")

})

app.post('/contact', (req , res) => {
    
    const name = req.body.name;
    const email = req.body.email;
    const date = req.body.date;

    
    if (name  && email && date ){
        const body_json = req.body;
        if (req.body.hasOwnProperty('checkbox')){
            body_json['checkbox'] = 'yes';
        }
        else{
             body_json['checkbox'] = 'no';
        }
        addContact(body_json);
    
        res.status(200).render("contactsucess.pug")

    }
    else {
        res.status(400).render("contacterror.pug");
    }
    
    

})

app.get('/admin/contactlog', authorizeMiddleware,(req , res) => {
    getContacts().then((contacts) => {
    res.render("contactlog.pug",{contacts})

    });



})
app.delete('/api/contact', authorizeMiddleware ,(req , res) => {
    if (req.body == undefined || req.body == null){
        res.setHeader('Content-Type', 'text/plain');
        res.status(400).send('body undefined or null');
    }
    else if (req.get('content-type') !== 'application/json'){
        res.setHeader('Content-Type', 'text/plain');
        res.status(400).send('body not json');
    }
    else{
        if (!("id" in req.body)){
            res.setHeader('Content-Type', 'text/plain');
            res.status(400).send('id property is requried');

        }
        else{
            
            const toDelete = req.body.id;
            
        
            const success =  deleteContact(toDelete);
          
            if (success == true) {
                res.setHeader('Content-Type', 'text/plain');
                res.status(200).send('ok');
            }
            
            else {
                res.setHeader('Content-Type', 'text/plain');
                res.status(404).send('no contact with given ID exists');

            }
            
        }
    }

})

app.get('/admin/salelog', authorizeMiddleware, (req , res) => {
    getRecentSales().then((recentSales) => {
        res.status(200).send(JSON.stringify(recentSales));

    });
     
})

app.get('/api/sale', (req,res) => {

    getRecentSales().then((recentSales) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(recentSales[0]));

    })
   
})

app.post('/api/sale',authorizeMiddleware ,(req,res) => {

    if (req.get('content-type') !== 'application/json'){
        res.setHeader('Content-Type', 'text/plain');
        res.status(400).send('body not json');
    }
    else{
        if (!("message" in req.body)){
            res.setHeader('Content-Type', 'text/plain');
            res.status(400).send('message property is requried');

        }
        else{
            const message = req.body["message"];
            addSale(message);
            res.setHeader('Content-Type', 'text/plain');
            res.status(200).send('ok');

        }
    }

   
})
app.delete('/api/sale', authorizeMiddleware,(req,res) => {
    res.setHeader('Content-Type', 'text/plain');
    endSale();
    res.status(200).send('ok');

})

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
  })



app.listen(port , () => {
  console.log(`Example app listening on port ${port}`)
})
