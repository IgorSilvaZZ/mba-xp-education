let chart_covid = null;

async function getApiData(date, country) {
  const { data } = await axios.get(
    `https://covid-api.com/api/reports/total?date=${date}&iso=${country}`
  );

  return data;
}

async function displayChart(dataApi) {
  document.getElementById("chart_info").style.display = "flex";
  document.getElementById("imagem__grafico").style.display = "none";

  const chart = document.getElementById("chart_covid");

  if (chart_covid) {
    chart_covid.destroy();
  }

  chart_covid = new Chart(chart, {
    type: "bar",
    data: {
      labels: ["Ativos", "Confirmados", "Mortes", "Recuperados"],
      datasets: [
        {
          label: "Atual",
          data: [
            dataApi.data.active,
            dataApi.data.confirmed,
            dataApi.data.deaths,
            dataApi.data.recovered,
          ],
          borderWidth: 0.5,
          backgroundColor: ["#0fb9b1"],
          /*  backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
          ], */
        },
        {
          label: "Descartados",
          data: [
            dataApi.data.active_diff,
            dataApi.data.confirmed_diff,
            dataApi.data.deaths_diff,
            dataApi.data.recovered_diff,
          ],
          backgroundColor: ["#3867d6"],
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          fontColor: "white",
        },
        x: {
          fontColor: "white",
        },
      },
      plugins: {
        legend: {
          position: "top",
          fontColor: "white",
        },
        title: {
          display: true,
          text: "Covid informações",
          fontColor: "white",
        },
      },
    },
  });
}

async function handleSubmit() {
  const date = document.getElementById("filter-date").value;
  const country = document.getElementById("filter-country").value;

  if (!date) {
    alert("Selecione uma data para prosseguir!");
    return;
  }

  if (!country) {
    alert("Selecione um pais para prosseguir!");
    return;
  }

  const dataApi = await getApiData(date, country);

  displayChart(dataApi);
}
