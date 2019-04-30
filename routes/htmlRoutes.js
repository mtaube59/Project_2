var db = require("../models");
// Store current set of search results in the currentResults array so it can be
// accessed when the page is re-rendered in when one of the results is clicked
// (clicking on an item in the results list sends the page to the /more/:id route
// which gets the description data for that particular record)
var currentResults = [];

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/top5", function(req, res) {
    db.Disaster.findAll({
      limit: 5,
      where: {
        status: 'current'
      }
    }).then(function(events) {
      // Render main page, passing the Events objects through 'events'
      currentResults = events;
      res.json({
      events: currentResults.filter(result => result.dataValues.title),
      description: events.description,
      title: events.title
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


  // get filtered disasters 
  app.get("/disasters/:querystring", function(req, res) {
    let qStr = req.params.querystring;
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
    // // ========================================================
    // // this is an awful way of getting the year ranges to display in the titlebar
    // // but it works
    // var dateIndex = qStr.indexOf("between");
    // if (dateIndex > 0) {
    //   let dateStr = qStr.slice(dateIndex + 11)
    //   yearStart = dateStr.substring(0,4)
    //   let indexDateEnd = dateStr.indexOf(', ');
    //   yearEnd = dateStr.substring(indexDateEnd+1,4);
    //   titleStr = `(${yearStart} - ${yearEnd}) ${titleStr} `;
    // }
    //=========================================================

    db.Disaster.findAll({
      where: searchFilter
    }).then(function(dbSearches) {
      currentResults = dbSearches;
      res.json({
        events: currentResults.filter(result => result.dataValues.title),
        description: "",
        titlebar: titleStr 
      })



      // res.render("index", {
      //   // res.render("../views/partials/displayEvents", {
      //     events: currentResults.filter(result => result.dataValues.title),
      //   description: "",
      //   titlebar: titleStr      
      // });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
