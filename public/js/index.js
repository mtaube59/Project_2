// The API object contains methods for each kind of request we'll make
var API = {
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

  // $exampleText.val("");
  // $exampleDescription.val("");
};

function handleEventClick(event) {
  console.log(event);
  var id = event.getAttribute("data-id");
  console.log('88888888888888888888888888');
  console.log(id);
  console.log('88888888888888888888888888');
  $.ajax({
    url: `/more/${id}`,
    type: "GET",
  })
  .then(
    function(){
      console.log('refreshed page');
    }
  )

};


// Add event listeners to the submit and delete buttons
$("#search-disaster").on("click", handleSearchSubmit);
// $(".event-list").on("click", handleEventClick)
