// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  // saveExample: function(example) {
  //   return $.ajax({
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     type: "POST",
  //     url: "api/examples",
  //     data: JSON.stringify(example)
  //   });
  // },
  // getExamples: function() {
  //   return $.ajax({
  //     url: "api/examples",
  //     type: "GET"
  //   });
  // },
  // deleteExample: function(id) {
  //   return $.ajax({
  //     url: "api/examples/" + id,
  //     type: "DELETE"
  //   });
  // },

  saveSearchedEvent: function(search) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/searchedevents",
      data: JSON.stringify(search)
    });
  },
  getSearchedEvents: function() {
    return $.ajax({
      url: "api/searchedevents",
      type: "GET"
    });
  }

};

// TO BE DONE LATER
// refreshSearchedEvents needs to get the searchedEvents data and display
// them somewhere, somehow...
var refreshSearchedEvents = function() {
  console.log("refreshSearchedEvents called.  This needs to be figured out");
    // API.getSearchedEvents().then(function(data) {
    // // need to process the searchedEvents data somehow
    // // I guess this would involve counting the items in each
    // // table column.  The # of event types will be easy to get.
    // // Counting the # of countries and how to display the info
    // // will be more challenging!
    // });
};

// handleSearchSubmit is called whenever we submit a new set
// of search criteria. Save the search data to our database
// and display the new data.
var handleSearchSubmit = function(event) {
  event.preventDefault();

  var searchedEvent = {
    country: $("#country").val().trim(),
    type: $("#disasterType").val().trim(),
    yearStart: $("#startingYear").val().trim(),
    yearEnd: $("#endingYear").val().trim()
  };

  API.saveSearchedEvent(searchedEvent).then(function() {
    refreshSearchedEvents();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// Add event listeners to the submit and delete buttons
$("#search-disaster").on("click", handleSearchSubmit);
