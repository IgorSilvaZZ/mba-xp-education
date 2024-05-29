// EXEMPLO Promise.resolve

const promise1 = new Promise((resolve) =>
  console.log("Sempre será resolvida P1!")
);

promise1.then((res) => console.log(res));

// EXEMPLO Promise.reject

// Promise.reject(console.log("Sempre será rejeitada!"));

// EXEMPLO Promise.all

Promise.all([
  new Promise((resolve) => setTimeout(resolve, 1200, "P1")),
  new Promise((resolve) => setTimeout(resolve, 700, "P2")),
  new Promise((resolve) => setTimeout(resolve, 2900, "P3")),
])
  .then((results) => results.data[0].name)
  .then((name) => console.info(name))
  .catch((error) => console.error(`Exceção lançada: ${error}`));

// EXEMPLO Promise.all - Sucesso na execução  de todas as promises

Promise.all([
  new Promise((resolve) => setTimeout(() => resolve([]), 1200)),
  new Promise((resolve) => setTimeout(() => resolve([10]), 700)),
  new Promise((resolve) => setTimeout(() => resolve([15, 20]), 2900)),
])
  .then((results) => results.length)
  .then((size) => console.info(size))
  .catch((error) => console.error(error));

// EXEMPLO Promise.all - Uma das promises será rejeitada

Promise.all([
  new Promise((resolve) => setTimeout(() => resolve([]), 2800)),
  new Promise((resolve, reject) => setTimeout(() => reject([10]), 1200)),
  new Promise((resolve) => setTimeout(() => resolve([15, 20]), 800)),
])
  .then((results) => results.length)
  .then((size) => console.info(size))
  .catch((error) => console.error(error));

// EXEMPLO Promise.race - Corrida de promises (A que retornar primeiro)

const promise2 = Promise.race([
  new Promise((resolve) => setTimeout(resolve, 2000, "P2 - Success")),
  new Promise((resolve, reject) => setTimeout(reject, 3000, "P2 - Error")),
]);

promise2.then((result) => console.log(result));
promise2.catch((error) => console.error(error));

// EXEMPLO Promise.race - Varias promises com rejeição

const promise3 = Promise.race([
  new Promise((resolve) => setTimeout(resolve, 3000, "P3 - Success")),
  new Promise((resolve, reject) => setTimeout(reject, 2000, "P3 - Error")),
  new Promise((resolve) => setTimeout(resolve, 4000, "P3 - Error")),
]);

promise3.then((result) => console.log(result));
promise3.catch((error) => console.error(error));

// EXEMPLO Promise.race - Exemplo pratico

function showStatus() {
  console.log("Carregando....");
}

function getCarInfo(car) {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => resolve(`Car details ${car}`),
      Math.floor(600 * Math.random)
    );
  });
}

function timeout(time, result) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result), time);
  });
}

function showCarInfo(car) {
  return getCarInfo(car).then((info) => {
    console.log(`Car Info ${info}`);
    return true;
  });
}

Promise.race([showCarInfo("Palio"), timeout(300)]).then((displayed) => {
  if (!displayed) showStatus();
});

// EXEMPLO Promise.allSettled

const promise4 = Promise.allSettled([
  new Promise((resolve) => setTimeout(resolve, 3000, "P4 - Success")),
  new Promise((resolve, reject) => setTimeout(reject, 2000, "P4 - Error")),
  new Promise((resolve) => setTimeout(resolve, 4000, "P4 - Error")),
]);

promise4.then((result) => console.log(result));
promise4.catch((error) => console.error(error));

// Exemplo Promise.any - Retorna a primeira promise fullfilled/realizada/resolvida

const promise5 = Promise.any([
  new Promise((resolve, reject) => setTimeout(reject, 2000, "P5 - Error")),
  new Promise((resolve) => setTimeout(resolve, 3000, "P5 - Success")),
  new Promise((resolve) => setTimeout(resolve, 4000, "P5 - Error")),
]);

promise5.then((result) => console.log(result));
promise5.catch((error) => console.error(error));
