const motorcycleDetailsContainer = document.getElementById(
  "motorcycle-details-container"
);
const imageCarousel = document.getElementById("image-carousel");
const carouselButtons = document.getElementById("carousel-buttons");
const productTitle = document.getElementById("product-title");
const productDescription = document.getElementById("product-description");
const productPrice = document.getElementById("product-price");
const productFeatures = document.getElementById("product-features");
const suite = document.createElement("button");
const productPanier = document.getElementById("product-panier");
const addToCartButton = document.getElementById("add-to-cart");
const cartIcon = document.getElementById("cart-icon");
const cartCount = document.getElementById("cart-count");
const panierListe = document.getElementById("panier-liste");

const urlParams = new URLSearchParams(window.location.search);
const motorcycleId = urlParams.get("id");

fetch(`http://localhost:3000/motorcycles?id=${motorcycleId}`)
  .then((response) => response.json())
  .then((data) => {
    const motorcycle = data[motorcycleId - 1];
    renderMotorcycleDetails(motorcycle);
    renderImageCarousel(motorcycle);
  })
  .catch((error) => {
    console.log(error);
  });

function renderMotorcycleDetails(motorcycle) {
  let ReductionPrice = motorcycle.price - motorcycle.reduction;
  productTitle.innerText = motorcycle.name;
  productDescription.innerText = motorcycle.description.substring(0, 150);
  suite.classList.add("suite");
  suite.innerText = "... Lire la suite";
  productDescription.appendChild(suite);
  suite.addEventListener("click", () => {
    productDescription.innerText = motorcycle.description;
    let reduire = document.createElement("button");
    reduire.classList.add("reduire");
    reduire.innerText = "- Réduire la description -";
    productDescription.appendChild(reduire);

    reduire.addEventListener("click", () => {
      productDescription.innerText = motorcycle.description.substring(0, 150);
      productDescription.appendChild(suite);
    });
  });
  productPrice.innerText = "Prix : " + ReductionPrice + " €";
  productFeatures.innerText = "Couleurs disponibles : " + motorcycle.colors;
  addToCartButton.innerText = "Ajouter au panier";
  productPanier.appendChild(addToCartButton);
  addToCartButton.addEventListener("click", () => {
    addToCart(motorcycle);
    displayMessageTemporarily(addToCartButton, "Ajouté", 2);
    cartIcon.appendChild(cartCount);
    cartCount.innerText = localStorage.length;
  });
  cartIcon.appendChild(cartCount);
  cartCount.innerText = localStorage.length;

  function renderPanierListe() {
    panierListe.innerHTML = "";

    for (let i = 0; i < localStorage.length; i++) {
      let item = JSON.parse(localStorage.getItem("item-" + (i + 1)));

      if (item !== null) {
        let li = document.createElement("li");
        li.innerText = item[0].name;
        panierListe.appendChild(li);

        // Bouton pour supprimer l'article individuellement
        let btnDeleteItem = document.createElement("img");
        btnDeleteItem.classList.add("delete-item");
        btnDeleteItem.src = "assets/logo/delete.svg";
        btnDeleteItem.addEventListener("click", () => {
          localStorage.removeItem("item-" + (i + 1));
          renderPanierListe();
        });
        li.appendChild(btnDeleteItem);
      }
    }

    // Bouton pour vider le panier
    let btnDeleteAllItems = document.createElement("img");
    btnDeleteAllItems.src = "assets/logo/alldelete.svg";
    btnDeleteAllItems.classList.add("delete-all-items");
    btnDeleteAllItems.addEventListener("click", () => {
      localStorage.clear();
      cartIcon.appendChild(cartCount);
      cartCount.innerText = localStorage.length;
      renderPanierListe();
    });
    panierListe.appendChild(btnDeleteAllItems);
  }
  cartIcon.addEventListener("click", () => {
    panierListe.classList.toggle("visible");
    renderPanierListe();
  });
}
function renderImageCarousel(motorcycle) {
  const images = [
    motorcycle.img_1,
    motorcycle.img_2,
    motorcycle.img_3,
    motorcycle.img_4,
    motorcycle.img_5,
  ];

  images.forEach((image, index) => {
    const button = document.createElement("button");
    button.classList.add("carousel-button");
    button.style.backgroundImage = `url(${image})`;
    button.addEventListener("click", () => {
      changeCarouselImage(image);
    });
    carouselButtons.appendChild(button);

    if (index === 0) {
      button.classList.add("active");
    }
  });

  // Afficher la première image comme image active par défaut.
  changeCarouselImage(images[0]);

  function changeCarouselImage(image) {
    imageCarousel.style.backgroundImage = `url(${image})`;

    const activeButton = document.querySelector(".carousel-button.active");
    activeButton.classList.remove("active");

    const clickedButton = Array.from(carouselButtons.children).find(
      (btn) => btn.style.backgroundImage === `url(${image})`
    );
    clickedButton.classList.add("active");
  }
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

  // alert("Un nouvel article a été acheté !" + "\n" + "Il s'agit d'une " + motorcycle.name + "\n" + "Vous avez actuellement " + localStorage.length + " article(s) dans votre panier !" + "\n \n" + "Vous pouvez consulter votre panier en cliquant sur l'icône panier en haut à droite de votre écran !");
}

function displayMessageTemporarily(element, message, duration) {
  const originalText = element.innerText;
  element.innerText = message;
  setTimeout(() => {
    element.innerText = originalText;
  }, duration * 1000);
}
