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

  app.get("/search", function(req, res) {
    db.Disaster.findAll({
      where: currentResults
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
          events: currentResults.filter(result => result.dataValues.title),
          description: data.description,
          title: data.title
        });
      });
    });

  // get filtered disasters 
  app.get("/disasters/:querystring", function(req, res) {
    let qStr = req.params.querystring;
    console.log(qStr);
    let searchFilter = JSON.parse(req.params.querystring);
    // build the titlebar string
    let keys = Object.keys(searchFilter);
    let titleStr = "";
    if (keys.includes('country') &&  keys.includes('type')) {
      titleStr = `${searchFilter['type']}s in ${searchFilter['country']}`
    } else if (keys.includes('country')){
      titleStr = searchFilter['country'];
    } else {
      titleStr = `${searchFilter['type']}s`
    }
    // var dateIndex = qStr.indexOf("between");
    // if (dateIndex > 0) {
    //   let dateStr = qStr.splice(dateIndex + 9)
    //   yearStart = dateStr.splice(0,4)
    //   let indexDateEnd = dateStr.indexOf(', ');
    //   yearEnd = dateStr.splice(indexDateEnd+2,4);
    //   titleStr = `(${yearStart} - ${yearEnd}) ${titleStr} `;
    // }

    db.Disaster.findAll({
      where: searchFilter
    }).then(function(dbSearches) {
      currentResults = dbSearches;
      res.render("index", {
        // res.render("../views/partials/displayEvents", {
          events: currentResults.filter(result => result.dataValues.title),
        description: "",
        titlebar: titleStr      
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
