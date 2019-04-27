var db = require("../models");
// Store current set of search results in the currentResults array so it can be
// accessed when the page is re-rendered in when one of the results is clicked
// (clicking on an item in the results list sends the page to the /more/:id route
// which gets the description data for that particular record)
var currentResults = [];

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Disaster.findAll({
      limit: 5,
      where: {
        status: 'current'
      }
    }).then(function(events) {
      // Render main page, passing the Events objects through 'events'
      currentResults = events;
      res.render("index", {
        events: events
      });
    });
  });

    // Route that displays the description of the data for the clicked event
    app.get("/more/:id", function(req, res) {
      db.Disaster.findOne({
        where: {
          id: req.params.id
        }
      }).then(function(data) {
        res.render("index", {
          events: currentResults,
          description: data.description
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

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
