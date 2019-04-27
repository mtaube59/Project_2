// The API object contains methods for each kind of request we'll make

var $submitSearch = $("#search-disaster");

var API = {
  saveSearchedEvent: function(url, search) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: url,
      data: JSON.stringify(search)
    });
  },
  getSearchedEvents: function(queryURL) {
    console.log('inside get searched events');
    console.log(queryURL);
    return $.ajax({
      url: queryURL,
      type: "GET"
    });
  }
};

// TO BE DONE LATER
// refreshSearchedEvents needs to get the searchedEvents data and display
// them somewhere, somehow...

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
  
  var hardcodesearch = JSON.stringify({country: "Mexico"});

  // API.saveSearchedEvent(`/api/searchedevents/${hardcodesearch}`)
  // .then(function() {
  //   clearSearchForm();
  //   currentSearch = {
  //     country: "Mexico"
  //   };
  console.log(hardcodesearch);
    location.href=`/api/disasters/${hardcodesearch}`;
    console.log("hello there");
    // refreshSearchedEvents();
  // });
  
};

function refreshSearchedEvents() {
  console.log("refreshSearchedEvents called.  This needs to be figured out");
  API.getSearchedEvents("/api/searchedevents?country=Mexico").then(function(data) {
    console.log(data);
    // need to process the searchedEvents data somehow
    // I guess this would involve counting the items in each
    // table column.  The # of event types will be easy to get.
    // Counting the # of countries and how to display the info
    // will be more challenging!
  });
};

function clearSearchForm() {
  $("#country").val('');
  $("#disasterType").prop('selectedIndex',0);
  $("#startingYear").prop('selectedIndex',0);
  $("#endingYear").prop('selectedIndex',0);
}

// This is called whenever a link in the Results list is clicked
function handleEventClick(event) {
  var id = event.getAttribute("data-id");
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
  $submitSearch.on("click", handleSearchSubmit);
  