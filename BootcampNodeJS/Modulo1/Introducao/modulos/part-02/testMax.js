import fs from "fs/promises";

async function readJson() {
  const data = await fs.readFile("car-list.json", "utf-8");

  const dataParsed = JSON.parse(data);

  let brandNameMaxModels = "";
  let brandMinModels = [];

  let brandMax = Number.MIN_VALUE;
  let brandMin = Number.MAX_VALUE;

  // Pegar o maior item
  for (let item of dataParsed) {
    const quantityModels = item.models.length;
    const brandName = item.brand;

    if (quantityModels > brandMax) {
      brandMax = quantityModels;
      brandNameMaxModels = brandName;
    }
  }

  // Realizar o empate do maior
  const draws = dataParsed.filter((item) => {
    if (item.models.length === brandMax) {
      return item.brand;
    }
  });

  if (draws.length > 0) {
    console.log(draws);
  } else {
    console.log(brandNameMaxModels);
  }
}

readJson();
