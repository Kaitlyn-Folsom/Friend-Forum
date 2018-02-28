// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      occupation: req.body.occupation,
      location: req.body.location,
      interest1: req.body.interest1,
      interest2: req.body.interest2,
      interest3: req.body.interest3,
      interest4: req.body.interest4,
      image: req.body.image,
      bio: req.body.bio
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        name: req.user.name,
        email: req.user.email,
        id: req.user.id,
        occupation: req.user.occupation,
        location: req.user.location,
        interest1: req.user.interest1,
        interest2: req.user.interest2,
        interest3: req.user.interest3,
        interest4: req.user.interest4,
        image: req.user.image,
        bio: req.user.bio
      });
    }
  });

  app.get("/api/user_data/:name", function(req, res) {
    db.User.findOne({
      where: {
        name: req.params.name
      }
    })
    .then(function(result) {
      res.json(result);
    });
  });

//Feed API routes

 app.get("/api/allFeed", function(req, res) {


        db.Feed.findAll({}).then(function(results) {

            res.json(results);
        });
  });

  app.post("/api/newFeed", function(req, res) {

    console.log("Test-Post Data: ");
    console.log(req.body);

    db.Feed.create({
        author: req.body.author,
        body: req.body.body,
        created_at: req.body.created_at
    }).then(function(results){

          res.end();
    })
  });

//------------Interests-----------------//

  app.post("/api/updateInterestsOne", function(req, res) {
    console.log(req.body);
    db.User.update({
      interest1: req.body.interest1
    },{
      where: 
        {id:req.body.id}
    }).then(function() {
      console.log("post got to the server side")
    })
  });
  app.post("/api/updateInterestsTwo", function(req, res) {
    console.log(req.body);
    db.User.update({
      interest2: req.body.interest2
    },{
      where: 
        {id:req.body.id}
    }).then(function() {
      console.log("post got to the server side")
    })
  });
  app.post("/api/updateInterestsThree", function(req, res) {
    console.log(req.body);
    db.User.update({
      interest3: req.body.interest3
    },{
      where: 
        {id:req.body.id}
    }).then(function() {
      console.log("post got to the server side")
    })
  });
  app.post("/api/updateInterestsFour", function(req, res) {
    console.log(req.body);
    db.User.update({
      interest4: req.body.interest4
    },{
      where: 
        {id:req.body.id}
    }).then(function() {
      console.log("post got to the server side")
    })
  });

//-------------Chat API routes--------------//

//------------------Business-------------------//

 app.get("/api/allBusiness", function(req, res) {

    db.Business.findAll({}).then(function(results) {

        res.json(results);
    });
  });

  app.post("/api/newBusiness", function(req, res) {

    console.log("Business | Test-Chat Data: ");
    console.log(req.body);

    db.Business.create({
        author: req.body.author,
        body: req.body.body,
        created_at: req.body.created_at
    }).then(function(results){

          res.end();
    })
  });

//------------------Entertainment-------------------//

 app.get("/api/allEntertainment", function(req, res) {

    db.Entertainment.findAll({}).then(function(results) {

        res.json(results);
    });
  });

  app.post("/api/newEntertainment", function(req, res) {

    console.log("Entertainment | Test-Chat Data: ");
    console.log(req.body);

    db.Entertainment.create({
        author: req.body.author,
        body: req.body.body,
        created_at: req.body.created_at
    }).then(function(results){

          res.end();
    })
  });

//------------------Gaming-------------------//

 app.get("/api/allGaming", function(req, res) {

    db.Gaming.findAll({}).then(function(results) {

        res.json(results);
    });
  });

  app.post("/api/newGaming", function(req, res) {

    console.log("Gaming | Test-Chat Data: ");
    console.log(req.body);

    db.Gaming.create({
        author: req.body.author,
        body: req.body.body,
        created_at: req.body.created_at
    }).then(function(results){

          res.end();
    })
  });

//------------------Music-------------------//

 app.get("/api/allMusic", function(req, res) {

    db.Music.findAll({}).then(function(results) {

        res.json(results);
    });
  });

  app.post("/api/newMusic", function(req, res) {

    console.log("Music | Test-Chat Data: ");
    console.log(req.body);

    db.Music.create({
        author: req.body.author,
        body: req.body.body,
        created_at: req.body.created_at
    }).then(function(results){

          res.end();
    })
  });

//------------------Politics-------------------//

 app.get("/api/allPolitics", function(req, res) {

    db.Politics.findAll({}).then(function(results) {

        res.json(results);
    });
  });

  app.post("/api/newPolitics", function(req, res) {

    console.log("Politics | Test-Chat Data: ");
    console.log(req.body);

    db.Politics.create({
        author: req.body.author,
        body: req.body.body,
        created_at: req.body.created_at
    }).then(function(results){

          res.end();
    })
  });

//------------------Science-------------------//

 app.get("/api/allScience%20and%20Nature", function(req, res) {

    db.Science.findAll({}).then(function(results) {

        res.json(results);
    });
  });

  app.post("/api/newScience%20and%20Nature", function(req, res) {

    console.log("Science | Test-Chat Data: ");
    console.log(req.body);

    db.Science.create({
        author: req.body.author,
        body: req.body.body,
        created_at: req.body.created_at
    }).then(function(results){

          res.end();
    })
  });

//------------------Sports-------------------//

 app.get("/api/allSports", function(req, res) {

    db.Sports.findAll({}).then(function(results) {

        res.json(results);
    });
  });

  app.post("/api/newSports", function(req, res) {

    console.log("Sports | Test-Chat Data: ");
    console.log(req.body);

    db.Sports.create({
        author: req.body.author,
        body: req.body.body,
        created_at: req.body.created_at
    }).then(function(results){

          res.end();
    })
  });

//------------------Technology-------------------//

 app.get("/api/allTechnology", function(req, res) {

    db.Technology.findAll({}).then(function(results) {

        res.json(results);
    });
  });

  app.post("/api/newTechnology", function(req, res) {

    console.log("Technology | Test-Chat Data: ");
    console.log(req.body);

    db.Technology.create({
        author: req.body.author,
        body: req.body.body,
        created_at: req.body.created_at
    }).then(function(results){

          res.end();
    })
  });

//----------Link Repo API Routes--------------//

//------------------Business-------------------//

 app.get("/api/allBusinessLink", function(req, res) {

    db.BusinessLinks.findAll({}).then(function(results) {

        res.json(results);
    });
  });

  app.post("/api/newBusinessLink", function(req, res) {

    console.log("Business Link | Test-Chat Data: ");
    console.log(req.body);

    db.BusinessLinks.create({
        author: req.body.author,
        body: req.body.body,
        created_at: req.body.created_at
    }).then(function(results){

          res.end();
    })
  });

//------------------Entertainment-------------------//

 app.get("/api/allEntertainmentLink", function(req, res) {

    db.EntertainmentLinks.findAll({}).then(function(results) {

        res.json(results);
    });
  });

  app.post("/api/newEntertainmentLink", function(req, res) {

    console.log("Entertainment Link | Test-Chat Data: ");
    console.log(req.body);

    db.EntertainmentLinks.create({
        author: req.body.author,
        body: req.body.body,
        created_at: req.body.created_at
    }).then(function(results){

          res.end();
    })
  });

//------------------Gaming-------------------//

 app.get("/api/allGamingLink", function(req, res) {

    db.GamingLinks.findAll({}).then(function(results) {

        res.json(results);
    });
  });

  app.post("/api/newGamingLink", function(req, res) {

    console.log("Gaming Link | Test-Chat Data: ");
    console.log(req.body);

    db.GamingLinks.create({
        author: req.body.author,
        body: req.body.body,
        created_at: req.body.created_at
    }).then(function(results){

          res.end();
    })
  });

//------------------Music-------------------//

 app.get("/api/allMusicLink", function(req, res) {

    db.MusicLinks.findAll({}).then(function(results) {

        res.json(results);
    });
  });

  app.post("/api/newMusicLink", function(req, res) {

    console.log("Music Link | Test-Chat Data: ");
    console.log(req.body);

    db.MusicLinks.create({
        author: req.body.author,
        body: req.body.body,
        created_at: req.body.created_at
    }).then(function(results){

          res.end();
    })
  });

//------------------Politics-------------------//

 app.get("/api/allPoliticsLink", function(req, res) {

    db.PoliticsLinks.findAll({}).then(function(results) {

        res.json(results);
    });
  });

  app.post("/api/newPoliticsLink", function(req, res) {

    console.log("Politics Link | Test-Chat Data: ");
    console.log(req.body);

    db.PoliticsLinks.create({
        author: req.body.author,
        body: req.body.body,
        created_at: req.body.created_at
    }).then(function(results){

          res.end();
    })
  });

//------------------Science-------------------//

 app.get("/api/allScience%20and%20NatureLink", function(req, res) {

    db.ScienceLinks.findAll({}).then(function(results) {

        res.json(results);
    });
  });

  app.post("/api/newScience%20and%20NatureLink", function(req, res) {

    console.log("Science Link | Test-Chat Data: ");
    console.log(req.body);

    db.ScienceLinks.create({
        author: req.body.author,
        body: req.body.body,
        created_at: req.body.created_at
    }).then(function(results){

          res.end();
    })
  });

//------------------Sports-------------------//

 app.get("/api/allSportsLink", function(req, res) {

    db.SportsLinks.findAll({}).then(function(results) {

        res.json(results);
    });
  });

  app.post("/api/newSportsLink", function(req, res) {

    console.log("Sports Link | Test-Chat Data: ");
    console.log(req.body);

    db.SportsLinks.create({
        author: req.body.author,
        body: req.body.body,
        created_at: req.body.created_at
    }).then(function(results){

          res.end();
    })
  });

//---------------Technology Links-------------------//

 app.get("/api/allTechnologyLink", function(req, res) {

    db.TechnologyLinks.findAll({}).then(function(results) {

        res.json(results);
    });
  });

  app.post("/api/newTechnologyLink", function(req, res) {

    console.log("Technology Link | Test-Chat Data: ");
    console.log(req.body);

    db.TechnologyLinks.create({
        author: req.body.author,
        body: req.body.body,
        created_at: req.body.created_at
    }).then(function(results){

          res.end();
    })
  });

}; //End module.exports
