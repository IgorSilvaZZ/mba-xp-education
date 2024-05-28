// EXEMPLO DE CRIAÇÃO E EXECUÇÃO DE PROMISES
// EXEMPLO 1

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Sucesso P1!");
  }, 2000);
});

promise1.then((response) => console.log(response));

// EXEMPLO DE CRIAÇÃO DE PROMISES E UTILIZAÇÃO DE CATCH
// EXEMPLO 2
const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Sucesso P2!");
  }, 2000);
});

promise2
  .then((response) => console.log(response))
  .catch((error) => console.log(error));

// EXEMPLO 3

const promise3 = new Promise((resolve, reject) => {
  if (Math.random() > 0.5) {
    resolve("Sucesso P3!");
  } else {
    reject("Falha P3!");
  }
});

promise3
  .then((response) => console.log(response))
  .catch((error) => console.log(error));

// EXEMPLO 4 - ENCADEAMENTO DE THEN
const promise4 = new Promise((resolve, reject) => {
  if (Math.random() > 0.5) {
    resolve("Sucesso P4");
  }

  reject("Falha P4");
});

promise4
  .then(function acao1(res) {
    console.log(`${res} da ação 1`);
    return res;
  })
  .then(function acao2(res) {
    console.log(`${res} da ação 2`);
    return res;
  })
  .then(function acao3(res) {
    console.log(`${res} da ação 3`);
    return res;
  })
  .catch(function erro(rej) {
    console.error(rej);
  });

// EXEMPLO 5 - ENCADEAMENTO DE CATCHs

const promise5 = new Promise((resolve, reject) => {
  if (Math.random() > 0.5) {
    resolve("Sucesso P5");
  }

  reject("Falha P5");
});

promise5
  .then(function acao1(res) {
    console.log(`${res} da ação 1`);
    return res;
  })
  .catch(function error1(rej) {
    console.error("Erro no primeiro catch P5");
    return rej;
  })
  .then(function acao2(res) {
    console.log(`${res} da ação 2`);
    return res;
  })
  .then(function acao3(res) {
    console.log(`${res} da ação 3`);
    return res;
  })
  .catch(function erro2(rej) {
    console.error("Erro no segundo catch P5");
  });

// EXEMPLO 6 - ENCADEAMENTO DE CATCHs DIRETAMENTE A PRIMEIRA PROMISE, OS DOIS SÃO EXECUTADOS

const promise6 = new Promise((resolve, reject) => {
  if (Math.random() > 0.5) {
    resolve("Sucesso P6");
  }

  reject("Falha P6");
});

promise6
  .catch(function error1(rej) {
    console.error("Falha no primeiro catch P6!");
    return rej;
  })
  .catch(function error2(rej) {
    console.error("Falha no segundo catch P6!");
  });

promise6
  .then(function acao1(res) {
    console.log(`${res} da ação 1`);
    return res;
  })
  .then(function acao2(res) {
    console.log(`${res} da ação 2`);
    return res;
  })
  .then(function acao3(res) {
    console.log(`${res} da ação 3`);
    return res;
  });

// EXEMPLO 7 - ENCADEAMENTO DE THENs E CATCHs COM EXCECAO NO MEIO DO FLUXO

const promise7 = new Promise((resolve, reject) => {
  if (Math.random() > 0.5) {
    resolve("Sucesso P7");
  }

  reject("Falha P7");
});

promise7.catch(function error1(rej) {
  console.error("Falha no primeiro catch P7!");
  return rej;
});

promise7
  .then(function acao1(res) {
    console.log(`Promessa rejeitada na ação 1 P7!`);
    throw new Error("Promessa P7 rejeitada!");
  })
  .catch(function error2(rej) {
    console.error(`Tratamento de rejeições em P7 ou acão1`);
    return rej;
  })
  .then(function acao2(res) {
    console.log(`${res} da ação 2 P7!`);
    return res;
  })
  .then(function acao3(res) {
    console.log(`${res} da ação 3 P7!`);
    return res;
  })
  .catch(function error3(rej) {
    console.error(`Tratamento das rejeições em ação2 e ação3!`);
  });
