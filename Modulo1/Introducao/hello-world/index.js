// process argv - Parametros passados ao executar o programa
const numero = Number(process.argv[2]);

const multiplos = [];

for (let i = 3; i < numero; i++) {
  if (i % 3 === 0 || i % 5 === 0) {
    multiplos.push(i);
  }
}

console.log(multiplos);
