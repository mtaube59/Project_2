var db = require("../models");

module.exports = function (app) {

  // increment count of record or add new record if id doesn't exist
  app.post("/api/searches/:id", function (req, res) {
    let paramId = req.params.id || null;
    if (paramId > 0) {
      db.Searches.increment('count', { where: { id: paramId } })
        .then(function(data) {
          res.json(data);
        });
    } else {
      db.Searches.create(req.body)
      .then(function(data) {
        res.json(data);
      });
    }
  });

  // get all searches
  app.get("/api/searches", function (req, res) {
    db.Searches.findAll({}).then(function(dbSearches) {
      res.json(dbSearches);
    });
  });


  // route for getting countrydata for plotting charts 
  app.get("/api/charts", function (req, res) {
    db.Searches.findAll({})
    .then(function (dbSearches) {
      var labels = [];
      var data = [];
      for (var i = 0; i < dbSearches.length; i++) {
        if (dbSearches[i].topic === 'country') {
          labels.push(dbSearches[i].name);
          data.push(dbSearches[i].count);
        }
      }
      console.log(labels);
      console.log(data);
      res.json({labels: labels, data: data});
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
