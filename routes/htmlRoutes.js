var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    // TODO...
    // Make API call for new data (or maybe we just do this one time to get the data in the database)

    // TODO...
    // After data is IN the database, we want to do a query to get the top 5 disasters from the database
    // and display it.  
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });


  // TODO 
  // set up a GET for when the user has entered a search criteria. We will need to do a 
  // GET with query string data.  (ie: /search/?country=peru&type=tornado)
  // https://www.arungudelli.com/tutorial/javascript/get-query-string-parameter-values-from-url-using-javascript/
    app.get("/search", function(req, res) {
      let fullpath = req;
      console.log(fullpath); 
    })


  // Not sure we need this...
  // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
