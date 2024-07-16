const containerBtn = document.querySelector("#container-btn");
const sectionProducts = document.querySelector("#section-products");

const URL_PRODUCT = "http://localhost:3000/products/";

// paint the dashboard and logout buttons

window.addEventListener("load", () => {
  const userOnline = localStorage.getItem("userOnline");
  if (userOnline !== null) {
    containerBtn.innerHTML = `
    <button type="button" id="dashboard-button" class="btn btn-warning">Dashboard</button>
    <button type="button" id="logout-button" class="btn btn-secondary">Logout</button>
    `;
    let logout = document.querySelector("#logout-button");
    logout.addEventListener("click", () => {
      localStorage.removeItem("userOnline");
      location.reload();
    });
    let userButton = document.querySelector("#dashboard-button");
    userButton.addEventListener("click", () => {
      window.location.href = "./src/pages/dashboard.html";
    });
  }
});


// paints the products
indexP(sectionProducts);

async function indexP(sectionProducts) {
  const response = await fetch(URL_PRODUCT);
  const products = await response.json();

  sectionProducts.innerHTML = ""

  products.forEach((product) => {
    sectionProducts.innerHTML += `
      <div class="card text-light col-2 card-custom">
        <img src="${product.image}"
          class="card-img h-100 object-fit-cover" alt="example">
      <div class="card-body bg-light text-dark">
          <h3 class="card-title">${product.name}</h3>
          <h4>$${product.price} COP</h4>
          <p class="card-text">${product.description}</p>
      </div>
    </div>
      `;
  });
}
