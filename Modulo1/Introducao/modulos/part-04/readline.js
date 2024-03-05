import readLine from "readline";

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function pergunta() {
  rl.question("Digite um numero ", (numero) => {
    const numeroParseado = Number(numero);

    if (numeroParseado === -1) {
      // Mata o processo no terminal
      rl.close();
    } else {
      const multiplos = [];

      for (let i = 3; i < numeroParseado; i++) {
        if (i % 3 === 0 || i % 5 === 0) {
          multiplos.push(i);
        }
      }

      console.log(multiplos);

      pergunta();
    }
  });
}

pergunta();
