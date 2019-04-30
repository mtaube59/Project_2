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


function createChart(labels, data, chartid) {

  var ctx = document.getElementById(chartid).getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'polarArea',
    data: {
      labels: labels,
      datasets: [{
        label: "# of Search Requests",
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      // scales: {
      //   yAxes: [{
      //     ticks: {
      //       beginAtZero: true
      //     }
      //   }]
      // }
    }
  });
  
}