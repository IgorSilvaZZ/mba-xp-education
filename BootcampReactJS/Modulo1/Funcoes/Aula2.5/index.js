let Carro = {
  proprietario: "Igor",
  ano: 2016,
};

const handler = {
  get(target, property, receiver) {
    console.log(`GET ${property}`);

    if (property in target) {
      return target[property];
    }

    return "Propriedade inexistente";
  },
};

let carroProxy = new Proxy(Carro, handler);

console.log(Carro.modelo);
console.log(carroProxy.modelo);

let tradutor = {
  Carro: "Car",
  Ano: "Year",
};

const handlerTradutor = {
  get(target, property) {
    if (property in target) {
      return target[property];
    } else {
      return property;
    }
  },
  set(target, property, value) {
    if (typeof value === "string") {
      target[property] = value;

      return true;
    } else {
      return false;
    }
  },
};

let tradutorProxy = new Proxy(tradutor, handlerTradutor);

console.log(tradutorProxy["Ano"]);
console.log(tradutorProxy["Carro"]);
console.log(tradutorProxy["Modelo"]);

tradutorProxy["Modelo"] = "Model";
tradutorProxy["Marca"] = 12345;

console.log(tradutorProxy["Modelo"]);
console.log(tradutorProxy["Marca"]);
