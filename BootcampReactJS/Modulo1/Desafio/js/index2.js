let chart_covid = null;

(async function () {
  const { data: dataApi } = await axios.get(
    `https://covid-api.com/api/reports/total?date=2021-06-02&iso=BRA`
  );

  const chart = document.getElementById("chart_covid");

  if (chart_covid) {
    chart_covid.destroy();
  }

  chart_covid = new Chart(chart, {
    type: "bar",
    data: {
      labels: [
        "Ativos",
        "Confirmados",
        "Mortes",
        "Recuperados",
        "Confirmados Descartados",
      ],
      datasets: [
        {
          label: "Atual",
          axis: "y",
          data: [
            dataApi.data.active,
            dataApi.data.confirmed,
            dataApi.data.deaths,
            dataApi.data.recovered,
            dataApi.data.confirmed_diff,
          ],
          borderWidth: 0.5,
          backgroundColor: [
            "#2980b9",
            "#00b894",
            "#d63031",
            "#6c5ce7",
            "#a29bfe",
          ],
          borderRadius: 5,
        },
      ],
    },
    options: {
      responsive: true,
      indexAxis: "y",
      plugins: {
        legend: {
          position: "top",
          fontColor: "white",
        },
      },
    },
  });
})();
