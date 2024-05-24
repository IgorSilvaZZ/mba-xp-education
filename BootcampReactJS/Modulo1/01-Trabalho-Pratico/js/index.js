const BASEURL = "http://makeup-api.herokuapp.com/api/v1/products.json";

const typesSorts = {
  rating_greater_than: 4,
  price_greater_than: 25,
  price_less_than: 20,
};

const productTypes = [
  "blush",
  "bronzer",
  "eyebrow",
  "eyeliner",
  "eyeshadow",
  "foundation",
  "lip liner",
  "lipstick",
  "mascara",
  "nail polish",
];

const brandList = [
  "almay",
  "alva",
  "anna sui",
  "annabelle",
  "benefit",
  "boosh",
  "burt's bees",
  "butter london",
  "c'est moi",
  "cargo cosmetics",
  "china glaze",
  "clinique",
  "coastal classic creation",
  "colourpop",
  "covergirl",
  "dalish",
  "deciem",
  "dior",
  "dr. hauschka",
  "e.l.f.",
  "essie",
  "fenty",
  "glossier",
  "green people",
  "iman",
  "l'oreal",
  "lotus cosmetics usa",
  "maia's mineral galaxy",
  "marcelle",
  "marienatie",
  "maybelline",
  "milani",
  "mineral fusion",
  "misa",
  "mistura",
  "moov",
  "nudus",
  "nyx",
  "orly",
  "pacifica",
  "penny lane organics",
  "physicians formula",
  "piggy paint",
  "pure anada",
  "rejuva minerals",
  "revlon",
  "sally b's skin yummies",
  "salon perfect",
  "sante",
  "sinful colours",
  "smashbox",
  "stila",
  "suncoat",
  "w3llpeople",
  "wet n wild",
  "zorah",
  "zorah biocosmetiques",
];

const capitalizeFirstLetter = (stringValue) => {
  let stringFormatted =
    String(stringValue).charAt(0).toUpperCase() + String(stringValue).slice(1);

  if (stringFormatted.includes("_")) {
    stringFormatted = stringFormatted.replace("_", " ");
  }

  return stringFormatted;
};

const formatPrice = (originalPrice) => {
  if (originalPrice) {
    const newPrice = parseFloat(originalPrice * 5.5).toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });

    return newPrice;
  }
};

function getFilters() {
  const brand = document.getElementById("filter-brand").value;
  const product_type = document.getElementById("filter-type").value;
  const sortType = document.getElementById("sort-type").value;

  let filters = {
    brand,
    product_type,
    sortType,
  };

  Object.keys(filters).forEach((key) => {
    if (["", "all", null].includes(filters[key])) {
      delete filters[key];
    }

    if (key === "sortType") {
      if (!["name-az", "name-za"].includes(filters[key])) {
        const newKey = filters[key];

        filters[newKey] = typesSorts[filters[key]];
      }

      delete filters[key];
    }
  });

  return filters;
}

async function getProducts() {
  const filters = getFilters();

  const urlSearchParams = new URLSearchParams(filters).toString();

  const response = await fetch(`${BASEURL}?${urlSearchParams}`);

  const data = await response.json();

  return data;
}

async function getProductsJson() {
  const response = await fetch("http://localhost:3000/products");

  console.log(response);

  const data = await response.json();

  return data;
}

function loadProducts(products) {
  const catalogSection = document.querySelector(".catalog");

  catalogSection.innerHTML = "";

  for (let product of products) {
    const item = `<div class="product" data-name="${
      product.brand
    }" data-brand="${product.brand}" data-type="${
      product.product_type
    }" tabindex="508">
        <figure class="product-figure">
            <img src="${product.image_link}" width="215" height="215" alt="${
      product.name
    }" onerror="javascript:this.src='img/unavailable.png'">
        </figure>
        <section class="product-description">
            <h1 class="product-name">${product.name ?? ""}</h1>
            <div class="product-brands"><span class="product-brand background-brand">${
              product.brand
            }</span>
        <span class="product-brand background-price">${
          formatPrice(product.price) ?? 0
        }</span></div>
        </section>
        <section class="product-details"><div class="details-row">
        <div>Brand</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.brand}</div>
        </div>
      </div><div class="details-row">
        <div>Price</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${
            formatPrice(product.price) ?? 0
          }</div>
        </div>
      </div><div class="details-row">
        <div>Rating</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${
            product.rating ?? 0
          }</div>
        </div>
      </div><div class="details-row">
        <div>Category</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${
            product.category ?? ""
          }</div>
        </div>
      </div><div class="details-row">
        <div>Product_type</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${
            product.product_type ?? ""
          }</div>
        </div>
      </div></section>
        </div>`;

    catalogSection.innerHTML += item;
  }
}

window.addEventListener("load", async () => {
  for (brand of brandList) {
    document.getElementById(
      "filter-brand"
    ).innerHTML += `<option value="${brand}">${capitalizeFirstLetter(
      brand
    )}</option>`;
  }

  for (let productType of productTypes) {
    document.getElementById(
      "filter-type"
    ).innerHTML += `<option value="${productType}">${capitalizeFirstLetter(
      productType
    )}</option>`;
  }

  const products = await getProducts();

  loadProducts(products);
});

document
  .getElementById("filter-name")
  .addEventListener("keyup", async (event) => {
    let products = await getProducts();

    const nameProduct = String(event.target.value).toLowerCase();

    products = products.filter((product) => {
      const productName = String(product.name).toLowerCase();

      if (productName.includes(nameProduct)) {
        return product;
      }
    });

    loadProducts(products);
  });

document.getElementById("filter-brand").addEventListener("change", async () => {
  let products = await getProducts();

  loadProducts(products);
});

document.getElementById("filter-type").addEventListener("change", async () => {
  let products = await getProducts();

  loadProducts(products);
});

document
  .getElementById("sort-type")
  .addEventListener("change", async (event) => {
    const sortType = event.target.value;

    let products = await getProducts();

    if (sortType === "name-az") {
      products = products.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortType === "name-za") {
      products = products.sort((a, b) => b.name.localeCompare(a.name));
    }

    loadProducts(products);
  });
