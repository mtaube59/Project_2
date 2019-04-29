// handleSearchSubmit is called whenever we submit a new set
// of search criteria. Save the search data to our database
// and display the new data.

$("#search-disaster").click(function (event) {
  // $("#search-disaster").on("click", function (event) {
  event.preventDefault();
  let country = $("#country").val().trim();
  let type = $("#disasterType").val().trim();
  let yearStart = parseInt($("#startingYear").val()) || 0;
  let yearEnd = parseInt($("#endingYear").val()) || 0;

  // Force yearEnd to be > yearStart
  if (yearStart > yearEnd) {
    [yearStart, yearEnd] = [yearEnd, yearStart];
  }

  let dateStart = null;
  let dateEnd = null;

  // build filterEvent and searchCriteria objects
  let filterEvent = {}      // used to filter data from disasters table
  let searchCriteria = {}   // used to insert data into the searches table

  if (country != '') {                                  // handle country case
    filterEvent['country'] = country;
    searchCriteria['country'] = country;
  };
  if (type != 'Choose...') {                            // handle type case
    filterEvent['type'] = type;
    searchCriteria['type'] = type;
  }

  // Build section of filterEvent object (for getting range of years from disasters table) ========
  if (yearStart != 0) {                        // handle yearStart case
    dateStart = yearStart.toString() + "-01-01T00:00:00+00:00";
    // if no yearEnd chosen, make it Dec 31 of the same year
    if (yearEnd === 0) {
      dateEnd = yearStart.toString() + "-12-31T23:59:59+00:00";
    }
  }

  if (yearEnd != 0) {                        // handle yearEnd case
    dateEnd = yearEnd.toString() + "-12-31T23:59:59+00:00";
    // if no yearStart chosen, make it Jan 1 of the same year
    if (yearStart === 0) {
      dateStart = yearEnd.toString() + "-01-01T00:00:00+00:00";
    }
  }

  if (dateStart != null && dateEnd != null) {
    filterEvent['date'] = { $between: [dateStart, dateEnd] }
  }
  // ====================== End of year filterEvent object section ========================================

  // insert years into the searchCriteria object =======================================
  let begin = 0;
  let end = 0;
  if (yearStart != 0) {
    begin = yearStart;
    if (yearEnd === 0) {
      end = begin;
    } else {
      end = yearEnd;
    }
  }

  if (yearEnd != 0) {
    end = yearEnd;
    if (yearStart === 0) {
      begin = end;
    }
  }

  // in order to handle a range of years being tracked in the searches table, each key
  // must have a unique name ('year2013', 'year2014', etc) otherwise only the last year
  // in a range will be recorded.
  if (begin != 0 && end != 0) {
    for (let i = begin; i <= end; i++) {
      searchCriteria[`year${i}`] = i;
    }
  }
  // ========================= end of searchCriteria object years section ==============


  // Send the POST request to add search data to searches table.
  $.ajax({
    headers: {
      "Content-Type": "application/json"
    },
    type: "GET",
    url: "/api/searches"
  }).then(function (dbSearches) {
    let existsId = 0;
    for (var key in searchCriteria) {
      let topic = key;
      // in order to be able to have multiple years in the object, the year keys are named
      //  'year2013', 'year2014', etc.  If the key has the word 'year' in it, then the topic
      // needs to just be set to 'year' in the seaches table.
      if (key.includes('year')) topic = 'year';

      let name = searchCriteria[key].toString().trim();
      existsId = recordExistsId(name, dbSearches);  // if record exists, returns the id
      if (existsId != 0) {   // if item exists, increment the counter for this item
        $.ajax({
          headers: {
            "Content-Type": "application/json"
          },
          type: "POST",
          url: `/api/searches/${existsId}`
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
          url: "/api/searches",
          data: JSON.stringify(bodyObj)
        })

      }
    }

    // $.ajax({
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   type: "POST",
    //   url: "/api/searches",
    //   data: search
    // })
  })
    .then(
      function () {
        // go to route: /api/disasters/:querystring 
        var search = JSON.stringify(filterEvent);
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
    if (data[i].name === name) {
      existId = data[i].id;
      break;
    }
  }
  return existId;
}

