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
