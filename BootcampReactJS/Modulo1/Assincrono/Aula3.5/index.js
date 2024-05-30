// EXEMPLO FUNÇÃO GERADORA

function getIdNormal(range) {
  let i = 0;

  while (i < range) {
    i++;

    return i;
  }
}

function* getIdGenerator(range) {
  let i = 0;

  while (i < range) {
    i++;

    // Declaração de rendimento
    yield i;
  }
}

let it = getIdGenerator(3);

console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

let it2 = getIdGenerator(3);

for (const item of it2) {
  console.log(item);
}

function* getUniqueID() {
  let id = 0;

  while (true) {
    id++;

    // Declaração de rendimento
    yield "id-" + id;
  }
}
const cars = {};
const idCarsGenerator = getUniqueID();

function addCar(car) {
  const id = idCarsGenerator.next().value;

  cars[id] = { id, car };
}

addCar("Palio");
addCar("Fox");
addCar("Mobi");

console.log(cars);

const carModelAll = {
  allModels: {
    Fiat: ["Palio", "Cronos", "Toro"],
    Volksvagem: ["Gol", "Up", "Nivus", "Tiguan"],
    Chevrolet: ["Onix", "Tracker", "Corsa"],
  },
  [Symbol.iterator]() {
    const brands = Object.values(this.allModels);

    // Index que indica o modelo atual
    let currentModelIndex = 0;

    // Index que indica a marca atual
    let currentBrandIndex = 0;

    return {
      next() {
        // Lista de todos os modelos da marca

        const models = brands[currentBrandIndex];

        // Indica que finalizou o número de modelos da marca corrente
        // Verifico se já navegou em todos os modelos da marca atual e passa para proxima
        if (!(currentModelIndex < models.length)) {
          currentBrandIndex++;
          currentModelIndex = 0;
        }

        // Verifica se o já navegou em todas as marcas
        if (!(currentBrandIndex < brands.length)) {
          // Indicando que já naveguei em todas
          return {
            value: undefined,
            done: true,
          };
        }

        return {
          value: brands[currentBrandIndex][currentModelIndex++],
          done: false,
        };
      },
    };
  },
  *carGenerator() {
    const brands = Object.values(this.allModels);

    let currentBrandIndex = 0;

    while (currentBrandIndex < brands.length) {
      yield* brands[currentBrandIndex];
      currentBrandIndex++;
    }
  },
};

let itA = carModelAll.carGenerator();

console.log(itA.next());

for (const car of carModelAll.carGenerator()) {
  console.log(car);
}

itB = carModelAll.carGenerator();
console.log([...itB]);
