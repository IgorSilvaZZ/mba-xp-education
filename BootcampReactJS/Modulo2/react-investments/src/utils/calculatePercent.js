export function calculatePercent(reports) {
  const newReports = [...reports];

  const firstValueReport = newReports[0].value;
  const lastValueReport = newReports[newReports.length - 1].value;

  // Calculando a porcentagem de rendimento de cada mes (Mes Atual + MesPosterior)
  for (let i = 1; i < newReports.length; i++) {
    const currentReportValue = newReports[i].value;
    const nextReportValue = newReports[i - 1].value;

    const percent =
      ((currentReportValue - nextReportValue) / nextReportValue) * 100;

    // Colocando um novo valor dentro do array de reports (Percentual do mes)
    newReports[i].percent = percent ?? 0;
  }

  // Calculando o porcental do ano, pegando o primeiro e ultimo rendimento do ano
  const totalPercent =
    ((lastValueReport - firstValueReport) / firstValueReport) * 100;

  // Calculando o total de rendimentos do ano, pegando o primeiro e ultiumo rendimento do ano.
  const totalPerformance = lastValueReport - firstValueReport;

  return { totalPercent, totalPerformance, reports: newReports };
}
