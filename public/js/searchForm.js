// handleSearchSubmit is called whenever we submit a new set
// of search criteria. Save the search data to our database
// and display the new data.

$("#search-disaster").click(function (event) {
  // $("#search-disaster").on("click", function (event) {
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

  var search = JSON.stringify(searchedEvent);

  // Send the POST request to add search data to searchedevents table.
  $.ajax({
    headers: {
      "Content-Type": "application/json"
    },
    type: "POST",
    url: "/api/searchedevents",
    data: search
  })
  .then(
    function() {
      // go to route: /api/disasters/:querystring 
      location.href = `/disasters/${search}`;
    }
  );

});

