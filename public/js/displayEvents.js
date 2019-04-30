let $eventsDisplay = $("#event-list-links");
let $moreInfoDisplay;

window.onload = function() {
  $moreInfoDisplay = $("#more-info-desc");
  $.ajax({
    headers: {
      "Content-Type": "application/json"
    },
    type: "GET",
    url: "/top5"
    })
    .then(function (data) {
      var events = data.events;

      var htmlstr ="";
      for (let i = 0; i < events.length; i++)  {
        htmlstr = htmlstr + `<p class="py-2 listed-event" data-id='${events[i].id}' data-desc='${events[i].description}'>${events[i].title}
        </p>`
      } 

      $eventsDisplay.html(htmlstr);
    })
    .then(function () {
      $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "GET",
        url: "/api/charts"
        })
        .then(function (data) {
          createChart(data.cLabels, data.cData, 'country-chart');
          createChart(data.dLabels, data.dData, 'disaster-chart');
        })
    })
}

const $dispEventList = $("#disp-events-title");

$eventsDisplay.on("click", ".listed-event", function(event) {
  $moreInfoDisplay.html($(this).attr("data-desc"));
})
