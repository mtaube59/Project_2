// The API object contains methods for each kind of request we'll make

var $submitSearch = $("#search-disaster");

var API = {
  saveSearchedEvent: function (url, search) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: url,
      data: JSON.stringify(search)
    });
  },
  getSearchedEvents: function (queryURL) {
    return $.ajax({
      url: queryURL,
      type: "GET"
    });
  }
};

// handleSearchSubmit is called whenever we submit a new set
// of search criteria. Save the search data to our database
// and display the new data.
var handleSearchSubmit = function (event) {
  event.preventDefault();
  let country = $("#country").val().trim();
  let type = $("#disasterType").val().trim();
  // let yearStart = $("#startingYear").val().trim();
  // let yearEnd = $("#endingYear").val().trim()

  // build searchEvent criteria object
  let searchedEvent = {}
  if (country != '') {
    searchedEvent['country'] = country;
  };
  if (type != 'Choose...') {
    searchedEvent['type'] = type;
  }
  // if (yearStart != 'Choose...'){
  //   var convertedDate = moment(yearStart).format();
  //   searchedEvent['yearStart'] = convertedDate;
  // }
  // if (yearEnd != 'Choose...'){
  //   var convertedDate2 = moment(yearEnd).format();
  //   searchedEvent['yearEnd'] = convertedDate2;
  // }

  console.log('in handleSubmit');
  var search = JSON.stringify(searchedEvent);

  // Send the POST request to add search data to searchedevents table.
  $.ajax("/api/searchedevents", {
    type: "POST",
    data: searchedEvent
  }).then(
    function(data) {
      console.log('back from /api/searchedevents');
      // console.log(data);
      // console.log(search);

      // // go to route: /api/disasters/:querystring 
      // location.href = `/disasters/${search}`;
    }
  );

};

function clearSearchForm() {
  $("#country").val('');
  $("#disasterType").prop('selectedIndex', 0);
  $("#startingYear").prop('selectedIndex', 0);
  $("#endingYear").prop('selectedIndex', 0);
}

// This is called whenever a link in the Results list is clicked
function handleEventClick(event) {
  var id = event.getAttribute("data-id");
  $.ajax({
    url: `/more/${id}`,
    type: "GET",
  })
  // .then(
  //   function(){
  //     console.log('refreshed page');
  //   }
  //   )
};


// Add event listeners to the submit and delete buttons
$submitSearch.on("click", handleSearchSubmit);
