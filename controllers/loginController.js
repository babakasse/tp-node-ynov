var router = require('express').Router();

router.get('/', function(req, res) {
  res.render('login.html');
});

router.post('/', function(req, res) {
  res.redirect('/index');
  /*var login = req.body.login;
  var password = req.body.password;
  if(login == "admin" && password == "password"){res.redirect('/');}
  else{console.log("Login ou mot de passe incorrecte");}*/
});

module.exports = router;