const { arrendodar } = require('../src/calcula-valor');

expect.extend({
  tenhaSomaDeValoresIgual: (items, soma) => {
    const somaReal = arrendodar(items.reduce((a, b) => a + b));
    const passou = somaReal === arrendodar(soma);

    return {
      pass: passou,
      message: () => `A soma ${somaReal} de ser igual a ${soma}`,
    };
  },

  sejaDescrescente: items => {
    for (let i = 0; i < items.length - 1; i++) {
      const j = i + 1;

      if (items[i] < items[j]) {
        return {
          message: () => 'O array deve estar em ordem descrescente',
          pass: false,
        };
      }
    }

    return {
      message: () => 'O array deve estar em ordem descrescente',
      pass: true,
    };
  },
});
