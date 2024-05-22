// EXEMPLO CLOSURE
function IMC() {
  let altura = 1.8;

  function calcula() {
    let peso = 70;
    console.log(`IMC: ${peso / (altura * altura)}`);
  }

  return calcula;
}

let imc = IMC();

imc();

// EXEPLO CLOSURE ENCAPSULAMENTO
function Carro() {
  this.proprietario = "Marcos";

  let ano = 2024;

  this.getAno = function () {
    return ano;
  };

  this.setAno = function (novoAno) {
    ano = novoAno;
  };
}

let carro = new Carro();

console.log(carro.proprietario);
console.log(carro.ano);
console.log(carro.getAno());
