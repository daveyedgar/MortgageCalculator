function displayChart(chartData){
  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: chartData.monthData,
      datasets: [
        {
          label: "Balance",
          data: chartData.balanceData,
          backgroundColor: "rgba(153,205,1,0.6)",
        },
        // {
        //   label: "Principal Payments",
        //   data: [2, 2, 5, 5, 2, 1, 10],
        //   backgroundColor: "rgba(155,153,10,0.6)",
        // },
        // {
        //   label: "Interest Payments",
        //   data: [4, 1, 2, 3, 6, 1, 9],
        //   backgroundColor: "rgba(144,144,10,0.6)",
        // },
      ],
    },
  })
};