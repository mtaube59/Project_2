var db = require("../models");

module.exports = function (app) {

  // Create a new searchedevent 
  app.post("/api/searches", function (req, res) {
    db.Searches.create(req.body)
      .then(function (data) {
        res.json(data);
      });
  });

  // increment count of record 
  app.post("/api/searches/:id", function (req, res) {
    db.Searches.increment('count', { where: { id: req.params.id } })
      .then(function (data) {
        res.json(data);
      });
  });

  // get all searches
  app.get("/api/searches", function (req, res) {
    db.Searches.findAll({}).then(function (dbSearches) {
      res.json(dbSearches);
    });
  });



  // get filtered disasters 
  app.get("/api/disasters/:querystring", function (req, res) {
    let searchFilter = JSON.parse(req.params.querystring);
    db.Disaster.findAll({
      where: searchFilter
    }).then(function (dbSearches) {
      res.json(dbSearches);
    });
  });


};
