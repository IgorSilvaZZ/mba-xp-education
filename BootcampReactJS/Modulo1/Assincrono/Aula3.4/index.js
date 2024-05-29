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
    return {
      next() {
        return {
          value: "",
          done: false,
        };
      },
    };
  },
};
