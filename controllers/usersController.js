const db = require("../models");
var bcrypt = require('bcryptjs');
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

//methods for usersController
module.exports = {
  
  findAll: function(req, res) {
    db.User
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    let {
      username,
      lastname,
      firstname,
      email,
      password,
      password2,
      bio,
      rating,
      profileImage,
      signupDate
      } = req.body;
    var messages = [];
  
    if (password !== password2) {
      messages.push({
        msg: 'Passwords do not match',
        type: 'warning'
      });
    }
    // If statemant to check passwords lenght
    if (password.length < 6) {
      messages.push({
        msg: 'Password must be at least 6 characters',
        type: 'warning'
      });
    }
    // If we have errors return them to form
    if (messages.length > 0) {
      return res.json(messages);
      // If we don't have errors continue
    } else {
      // Prepare form values for database
      firstname = firstname.toLowerCase();
      firstname = firstname.charAt(0).toUpperCase() + firstname.slice(1);
      email = email.toLowerCase();
      // Hash users password
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(password, salt);
      // function to find user by email
      // If user exist we respond with error msg
      // If user doesn't exist, create new record
      db.User.find({
          email: email
          },function (err, data) {
          if (data.length !== 0) {
              messages.push({
                  msg: 'User with this email already exists',
                  type: 'warning'
              });
              return res.json(messages);
          } else {
            db.User.create({
            username: username,
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hash,
            bio: bio,
            rating: rating,
            profileImage: profileImage,
            signupDate: signupDate
            })
            .then(function(dbUser) {
                messages.push({
                    msg: 'Account successfully created, you can login.',
                    type: 'success'
                });
                return res.json(messages);
            }) ; 
        }
      });
    }
  },
  remove: function(req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }, 
  // authenticateUser: function(req, res) {
  //   console.log(req.body)
  //   passport.authenticate('local',
    
  //    function(req, res) {
  //     // If this function gets called, authentication was successful.
  //     // `req.user` contains the authenticated user.
  //     res.redirect('/dashboard');
  //   });
  // }
};