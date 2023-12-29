const express = require('express')
const session = require('express-session');
const cookieSession = require('cookie-session')
const app = express()
const passport = require('passport')
require('dotenv').config()
require('./passport-setup')

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'bla bla bla' 
  }));


app.use(passport.session())
app.use(passport.initialize())


app.set("view engine","ejs")



app.get('/',(req,res)=>{
    res.render("pages/index")
})

app.get('/success',(req,res)=>{
    res.send('SUCCESS',{name:req.user.displayName,email:req.user.emails[0].value,pic:req.user.photos[0].value})
})


app.get('/google',passport.authenticate('google',{scope:['profile','email']}))


app.get('/google/callback',passport.authenticate('google',{failureRedirect:'/failed'}),
function(req,res){
    res.redirect('/success')
})


app.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      else {
        res.session = null
        res.redirect('/')
      }
    });
  });


app.listen(5000,()=>{
    console.log("Server Listening to Port Number 5000...")
}) 