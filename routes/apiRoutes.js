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
    let searchFilter = JSON.parse(req.params.querystring);
    db.Disaster.findAll({
      where: searchFilter
    }).then(function(dbSearches) {
      res.json(dbSearches);
    });
  });

  // Create a new searchedevent
  app.post("/api/searchedevents", function(req, res) {
    console.log('in api/searchedevents');
    console.log(req.body);
    db.SearchedEvent.create(req.body)
    .then(function(data) {
      res.redirect(`/disasters/${JSON.stringify(req.body)}`);
    });
  });

};
