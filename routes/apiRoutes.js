var db = require("../models");

module.exports = function(app) {

  // get all searchedevents
  app.get("/api/searchedevents", function(req, res) {
    db.SearchedEvent.findAll({}).then(function(dbSearches) {
      res.json(dbSearches);
    });
  });

  // get filtered disasters 
  app.get("/api/disasters/:querystring", function(req, res) {
    console.log('inside get filtered disasters');
    let searchFilter = JSON.parse(req.params.querystring);
    console.log(searchFilter);
    db.Disaster.findAll({
      where: searchFilter
    }).then(function(dbSearches) {
      console.log('done');
      console.log(dbSearches);
      res.json(dbSearches);
    });
  });

  // Create a new searchedevent
  app.post("/api/searchedevents", function(req, res) {
    db.SearchedEvent.create(req.body).then(function(data) {
      res.json(data);
    });
  });

};
