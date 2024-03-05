import fs from "fs/promises";

/* Utilizando de forma asincrona juntamente async e await */
async function main() {
  try {
    await fs.writeFile("teste2.txt", "bla bla bla");

    await fs.appendFile("teste2.txt", "teste2 append file");

    const data = await fs.readFile("teste2.txt", "utf-8");

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

main();

// Utilizando promise com then e catch
/* fs.writeFile("teste.txt", "bla bla bla")
  .then(() => {
    fs.appendFile("teste.txt", "teste append file")
      .then(() => {
        fs.readFile("teste.txt", "utf-8")
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.log(error);
  }); */

/* Utilizando com callback */
/* // Escrever no arquivo e caso nao exista ele cria com o conteudo passado
fs.writeFile("text.txt", "bla bla bla", (err) => {
  if (err) {
    console.log(err);
  } else {
    // Adicionar coisas no final do arquivo, apendar informações no arquivo
    fs.appendFile("text.txt", "test append file", (err) => {
      if (err) {
        console.log(data);
      } else {
        // Ler o arquivo
        fs.readFile("text.txt", "utf-8", (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
          }
        });
      }
    });
  }
});

 */
/* Utilizando de forma sincrona */
/* try {
  fs.writeFileSync("test.txt", "bla bla bla");

  const data = fs.readFileSync("test.txt", "utf-8");

  console.log(data);
} catch (error) {
  console.log(error);
} */
