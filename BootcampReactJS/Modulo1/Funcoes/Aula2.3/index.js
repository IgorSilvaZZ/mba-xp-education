function Pessoa(nome) {
  if (!nome) {
    this.nome = "Fulano";
  } else {
    this.nome = nome;
  }

  this.dizerOla = function () {
    console.log(`${this.nome} diz: Olá!`);
  };
}

let pessoa1 = new Pessoa("Iguinho");

// Isso nao é aplicado as instancias criadas da class Pessoa
Pessoa.digaOla = () => console.log(`Olá, meu nome é: ${this.nome}`);

let pessoa2 = new Pessoa("Bia");

console.log("-----------------------------------------------------");

try {
  pessoa1.digaOla();
} catch (error) {
  console.log("Falha no pessoa1.digaOla");
}

try {
  pessoa2.digaOla();
} catch (error) {
  console.log("Falha no pessoa2.digaOla");
}

console.log("-----------------------------------------------------");

pessoa2.digaOla = function () {
  console.log(`Oi, meu nome é ${this.nome}`);
};

try {
  pessoa1.digaOla();
} catch (error) {
  console.log("Falha no pessoa1.digaOla");
}

try {
  pessoa2.digaOla();
} catch (error) {
  console.log("Falha no pessoa2.digaOla");
}

console.log("-----------------------------------------------------");

Pessoa.prototype.digaOla = function () {
  console.log(`Olá, eu sou o: ${this.nome}`);
};

let pessoa3 = new Pessoa("Ana");

try {
  pessoa1.digaOla();
} catch (error) {
  console.log("Falha no pessoa1.digaOla");
}

try {
  pessoa2.digaOla();
} catch (error) {
  console.log("Falha no pessoa2.digaOla");
}

try {
  pessoa3.digaOla();
} catch (error) {
  console.log("Falha no pessoa3.digaOla");
}

console.log("-----------------------------------------------------");

Pessoa.prototype.dizerOla = function () {
  console.log(`${this.nome} vou dizer outro Olá!`);
};

// Realizando a sobrescrita da função
pessoa2.dizerOla = function () {
  console.log(`${this.nome} consigo dizer outro Olá!`);
};

try {
  pessoa1.dizerOla();
} catch (error) {
  console.log("Falha no pessoa1.dizerOla");
}

try {
  pessoa2.dizerOla();
} catch (error) {
  console.log("Falha no pessoa2.dizerOla");
}

try {
  pessoa3.dizerOla();
} catch (error) {
  console.log("Falha no pessoa3.dizerOla");
}
