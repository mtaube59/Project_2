var db = require("../models");

module.exports = function(app) {
  // Get all examples
  // app.get("/api/examples", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.json(dbExamples);
  //   });
  // });

  // // Create a new example
  // app.post("/api/examples", function(req, res) {
  //   db.Example.create(req.body).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });

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
    db.SearchedEvent.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

};
