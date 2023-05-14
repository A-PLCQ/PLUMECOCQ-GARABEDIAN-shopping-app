const motorcyclesContainer = document.getElementById("motorcycles-container");

function getMotorcycles() {
  fetch("http://localhost:3000/motorcycles")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((motorcycle) => {
        renderMotorcycleCard(motorcycle);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

getMotorcycles();

function renderMotorcycleCard(motorcycle) {
  const card = document.createElement("div");
  card.classList.add("motorcycle-card");

  const image = document.createElement("img");
  image.src = motorcycle.img_1;
  image.alt = motorcycle.name;
  card.appendChild(image);

  const title = document.createElement("div");
  title.classList.add("title");
  title.innerText = motorcycle.name;
  card.appendChild(title);

  const price = document.createElement("div");
  price.classList.add("price");

  if (motorcycle.reduction > 0) {
    const originalPrice = document.createElement("span");
    originalPrice.classList.add("original-price");
    originalPrice.innerText = motorcycle.price + " €";
    price.appendChild(originalPrice);
  }

  const discountedPrice = document.createElement("span");
  discountedPrice.innerText = motorcycle.price - motorcycle.reduction + " €";
  price.appendChild(discountedPrice);

  card.appendChild(price);

  const addToCartButton = document.createElement("a");
  addToCartButton.classList.add("add-to-cart");
  addToCartButton.innerText = "Ajouter au panier";
  card.appendChild(addToCartButton);
  addToCartButton.addEventListener("click", () => {
    addToCart(motorcycle);
    displayMessageTemporarily(addToCartButton, "Ajouté", 2);
  });

  const viewDetailsButton = document.createElement("a");
  viewDetailsButton.classList.add("view-details");
  viewDetailsButton.innerText = "Voir la fiche produit";
  viewDetailsButton.href = "details.html?id=" + motorcycle.id;
  card.appendChild(viewDetailsButton);

  motorcyclesContainer.appendChild(card);
}

function addToCart(motorcycle) {
  let itemNumber = 1;
  let item = JSON.parse(localStorage.getItem("item-" + itemNumber));

  while (item !== null) {
    itemNumber++;
    item = JSON.parse(localStorage.getItem("item-" + itemNumber));
  }

  let newItem = [];
  if (item === null) {
    newItem.push(motorcycle);
    localStorage.setItem("item-" + itemNumber, JSON.stringify(newItem));
  } else {
    newItem = item;
    newItem.push(motorcycle);
    localStorage.setItem("item-" + itemNumber, JSON.stringify(newItem));
  }

  // alert('Ca va te coûter cher fdp !');
}

function displayMessageTemporarily(element, message, duration) {
  const originalText = element.innerText;
  element.innerText = message;
  setTimeout(() => {
    element.innerText = originalText;
  }, duration * 1000);
}
