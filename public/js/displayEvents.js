let $eventsDisplay = $("#event-list-links");
let $moreInfoDisplay;

console.log($eventsDisplay);


window.onload = function() {
  $moreInfoDisplay = $("#more-info-desc");
  console.log($moreInfoDisplay);
  
  $.ajax({
    headers: {
      "Content-Type": "application/json"
    },
    type: "GET",
    url: "/top5"
    })
    .then(function (data) {
      var events = data.events;
      console.log('=====================');

      console.log(events);
      // $("#event-list-links").empty()
      var htmlstr;
      for (let i = 0; i < events.length; i++)  {
        htmlstr = htmlstr + `<h3 class="py-2 listed-event" data-id='${events[i].id}' data-desc='${events[i].description}'>${events[i].title}
        </h3>`
        console.log(events[i].title);
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
        .then(function (chartdata) {
          // console.log(chartdata);
          createChart(chartdata.labels, chartdata.data);
        })
    })
}

const $dispEventList = $("#disp-events-title");

$eventsDisplay.on("click", ".listed-event", function(event) {
  // var id = event.target.dataSet.id
  $moreInfoDisplay.html($(this).attr("data-desc"));
  // console.log("you clicked " + $(this).attr("data-desc"));    // YAY - this prints the desciption to the screen!!!
})


function createChart(labels, data) {

  console.log(data);
  console.log(labels);
  var ctx = document.getElementById('country-chart').getContext('2d');
  // var myChart = new Chart(ctx, {
  var myChart = new Chart(ctx, {
    type: 'bar',
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
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
  
}