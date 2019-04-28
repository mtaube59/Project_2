// handleSearchSubmit is called whenever we submit a new set
// of search criteria. Save the search data to our database
// and display the new data.

$("#search-disaster").click(function (event) {
  // $("#search-disaster").on("click", function (event) {
  event.preventDefault();
  let country = $("#country").val().trim();
  let type = $("#disasterType").val().trim();
  let yearStart = $("#startingYear").val().trim();
  let yearEnd = $("#endingYear").val().trim();

  
  // build searchEvent criteria object
  let searchedEvent = {}
  if (country != '') {
    searchedEvent['country'] = country;
  };
  if (type != 'Choose...') {
    searchedEvent['type'] = type;
  }
  // if (yearStart != 'Choose...'){
  //   let dateStart = yearStart + '-01-01T00:00:00+00:00';
  //   // var convertedDate = moment(yearStart).format();
  //   searchedEvent['yearStart'] = datestart;
  // }
  // if (yearEnd != 'Choose...'){
  //   let dateEnd = yearEnd + '-12-31T23:59:59+00:00';
  //   // var convertedDate2 = moment(yearEnd).format();
  //   searchedEvent['yearEnd'] = dateEnd;
  // }

  // const where = {
//   from: {
//       $between: [startDate, endDate]
//   }
// };


  var search = JSON.stringify(searchedEvent);

  // Send the POST request to add search data to searchedevents table.
  $.ajax({
    headers: {
      "Content-Type": "application/json"
    },
    type: "GET",
    url: "/api/searchedevents"
  }).then(function(dbSearches) {
    let existsId = 0;

    for (var key in searchedEvent) {
      let topic = key;
      let name = searchedEvent[key];
      existsId = recordExistsId(name, dbSearches);  // if record exists, returns the id
      if (existsId != 0) {   // if item exists, increment the counter for this item
        $.ajax({
          headers: {
            "Content-Type": "application/json"
          },
          type: "POST",
          url: `/api/searchedevents/${existsId}`
        })        
      } else {        // if item does not exist, insert record into table with counter = 1
        let bodyObj = {
          topic: topic,
          name: name,
          count: 1
        };
        $.ajax({
          headers: {
            "Content-Type": "application/json"
          },
          type: "POST",
          url: "/api/searchedevents",
          data: JSON.stringify(bodyObj)
        })

      }      
    }

    // $.ajax({
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   type: "POST",
    //   url: "/api/searchedevents",
    //   data: search
    // })
  })
  .then(
    function() {
      // go to route: /api/disasters/:querystring 
      location.href = `/disasters/${search}`;
    }
  );

});


/**
 * Returns the id of the record if it exists
 * @param {*} name : word to search for (country name, disaster type or year)
 * @param {*} data : array from searches table in database
 */
function recordExistsId(name, data) {
  let existId = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].name === name){
      existId = data[i].id;
      break;
    }
  }
  return existId;
}

