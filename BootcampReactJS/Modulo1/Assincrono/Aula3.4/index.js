// EXEMPLO DE Iterator

const carModel = ["Onix", "T-Cross", "HB20", "Palio"];

// FOR
// for (let index = 0; index < carModel.length; index++) {
//   console.log(carModel[index]);
// }

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
};

for (const car of carModelAll) {
  console.log(car);
}
