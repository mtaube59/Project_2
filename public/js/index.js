// handleSearchSubmit is called whenever we submit a new set
// of search criteria. Save the search data to our database
// and display the new data.

// FOR SOME REASON, THIS IS CALLED 4 TIMES WHENEVER THE
// SEARCH-DISASTER BUTTON IS CLICKED  --- WHYYY????
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

  console.log('in handleSubmit');
  console.log(searchedEvent);
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
      console.log('back from /api/searchedevents');

      // go to route: /api/disasters/:querystring 
      location.href = `/disasters/${search}`;
    }
  );

  // location.href = `/disasters/${search}`;


});

function clearSearchForm() {
  $("#country").val('');
  $("#disasterType").prop('selectedIndex', 0);
  $("#startingYear").prop('selectedIndex', 0);
  $("#endingYear").prop('selectedIndex', 0);
}

// This is called whenever a link in the Results list is clicked
// function handleEventClick(event) {
//   var id = event.getAttribute("data-id");
//   $.ajax({
//     url: `/more/${id}`,
//     type: "GET",
//   })
// };
