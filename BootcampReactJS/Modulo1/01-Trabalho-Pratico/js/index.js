const BASEURL = "http://makeup-api.herokuapp.com/api/v1/products.json";

const capitalizeFirstLetter = (stringValue) => {
  let stringFormatted =
    String(stringValue).charAt(0).toUpperCase() + String(stringValue).slice(1);

  if (stringFormatted.includes("_")) {
    stringFormatted = stringFormatted.replace("_", " ");
  }

  return stringFormatted;
};

function getFilters() {
  const nameValue = document.getElementById("filter-name").value;
  const brandValue = document.getElementById("filter-brand").value;
  const typeValue = document.getElementById("filter-type").value;
  const sortValue = document.getElementById("sort-type").value;
}

async function getProducts() {
  getFilters();

  const response = await fetch(`${BASEURL}?rating_greater_than=4`);

  const data = await response.json();

  return data;
}

function loadProducts(products) {
  const catalogSection = document.querySelector(".catalog");

  const products_types = [];

  for (let product of products) {
    document.getElementById("filter-brand").innerHTML += `<option value="${
      product.brand
    }">${capitalizeFirstLetter(product.brand)}</option>`;

    if (!products_types.includes(product.product_type)) {
      products_types.push(product.product_type);
    }

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
          product.price ?? 0
        }</span></div>
        </section>
        </div>`;

    catalogSection.innerHTML += item;
  }

  for (let product_type of products_types) {
    document.getElementById(
      "filter-type"
    ).innerHTML += `<option value="${product_type}">${capitalizeFirstLetter(
      product_type
    )}</option>`;
  }
}

window.addEventListener("load", async () => {
  const products = await getProducts();

  loadProducts(products);
});
