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
