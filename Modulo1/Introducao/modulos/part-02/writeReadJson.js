import fs from "fs/promises";

async function writeReadJson() {
  try {
    const arrayCars = ["Gol", "Palio", "Uno"];

    const carsObj = {
      cars: arrayCars,
    };

    await fs.writeFile("test.json", JSON.stringify(carsObj, null, 2));

    const data = await fs.readFile("test.json", "utf-8");

    const dataParsed = JSON.parse(data);

    dataParsed.cars.push("Sandero");

    await fs.writeFile("test.json", JSON.stringify(dataParsed, null, 2));

    const dataUpdated = await fs.readFile("test.json", "utf-8");

    const dataUpdatedParsed = JSON.parse(dataUpdated);

    console.log(dataUpdatedParsed);
  } catch (error) {
    console.log(error);
  }
}

writeReadJson();
