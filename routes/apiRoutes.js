var db = require("../models");

module.exports = function(app) {
  
  // Create a new searchedevent 
  app.post("/api/searchedevents", function(req, res) {
    console.log('inside api searchedevents..........');
    db.SearchedEvent.create(req.body)
    .then(function(data) {
      res.json(data); 
    });
  });
  // get all searchedevents
  app.get("/api/searchedevents", function(req, res) {
    db.SearchedEvent.findAll({}).then(function(dbSearches) {
      res.json(dbSearches);
    });
  });

  // get filtered disasters 
  app.get("/api/disasters/:querystring", function(req, res) {
    let searchFilter = JSON.parse(req.params.querystring);
    db.Disaster.findAll({
      where: searchFilter
    }).then(function(dbSearches) {
      res.json(dbSearches);
    });
  });


};
