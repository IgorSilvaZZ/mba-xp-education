// EXEMPLO DE CURRYING

function log(date, type, message) {
  console.log(
    `[${date.getHours()}:${date.getMinutes()}] [${type}] - ${message}`
  );
}

log(new Date(), "DEBUG", "Exemplo de currying!");

const logCurrying = (date) => (type) => (message) =>
  console.log(
    `[${date.getHours()}:${date.getMinutes()}] [${type}] - ${message}`
  );

logCurrying(new Date())("DEBUG")("Exemplo de currying! SENDO EXECUTADO!");

let logNow = logCurrying(new Date());

logNow("DEBUG")("Exemplo de currying! SENDO EXECUTADO! Com parametro fixo!");

let logDebugNow = logNow("DEBUG");

logDebugNow(
  "Exemplo de currying! SENDO EXECUTADO! Com parametro fixo e separação de chamadas!"
);
