const logout = document.querySelector("#logout-button")
const productList = document.querySelector("#product-list")
const form = document.querySelector("form")
const name = document.querySelector('#product-name')
const price = document.querySelector('#product-price')
const amount = document.querySelector('#product-amount')
const image = document.querySelector('#product-image')
const description = document.querySelector('#product-description')

console.log(description.textContent)
const URL_PRODUCT = 'http://localhost:3000/products/'

let id

// window check if user online

window.addEventListener("load", () => {
  const userOnline = localStorage.getItem("userOnline");
  if (userOnline === null) {
    confirm("login to access dashboard")
    window.location.href = '/'
  }
})

// load index function
index()

// loguot
logout.addEventListener('click', () => {
  // Delete user information from localStorage
  localStorage.removeItem('userOnline')
  // Redirect user to login page
  window.location.href = '/'
})

// form submit event listener
form.addEventListener('submit', async (event) => {
  event.preventDefault()
  if (!id) {
    await create(name, price, amount, image, description)
  }else {
    await updateProduct(id,name, price, amount, image, description )
    id = undefined
} 
  await index()
  form.reset()
})

// buttons of edit and delete event listeners

productList.addEventListener('click', async (event) => {
  if (event.target.classList.contains('btn-danger')) {
      const id = event.target.getAttribute('data-id')
      const isConfirmed = confirm("Do you want to delete this product?");
      if (isConfirmed) {
          await deleteProduct(id);
          await index();
      }
  } else if (event.target.classList.contains('btn-warning')) {
      id = event.target.getAttribute('data-id')
      const productFound = await find(id)
      name.value = productFound.name
      price.value = productFound.price
      amount.value = productFound.amount
      image.value = productFound.image
      description.value = productFound.description
  }
})

// function search for a product by id in the api
async function find(id) {
  const response = await fetch(URL_PRODUCT + id)
  const data = await response.json()
  return data
}


// function create
async function create(name, price, amount, image, description) {
  const newProducts = {
    name : name.value,
    price : price.value,
    amount : amount.value,
    image : image.value,
    description : description.value
    
  }

  console.log(newProducts)
  await fetch(URL_PRODUCT, {
      method: 'POST',
      body: JSON.stringify(newProducts),
      headers: {
          'Content-Type': 'application/json'
      },
  })
}


// function list products in table by farmer
async function index() {
  
  const response = await fetch(URL_PRODUCT);
  const data = await response.json();
  // add user products to the productList
  productList.innerHTML = ''
  data.forEach(product => {
      productList.innerHTML += `
          <tr>
              <td>${product.name}</td>
              <td><img width="100px" src="${product.image}" alt=""></td>
              <td>${product.price}</td>
              <td>${product.amount}</td>
              <td>${product.amount * product.price}</td>
              <td>
                  <button type="button" data-id="${product.id}" class="btn btn-danger ms-3">Delete</button>
              </td>
              <td>
                  <button type="button" data-id="${product.id}" class="btn btn-warning ms-3">Edit</button>
              </td>
          </tr>
          `;
  });

}
// function update

async function updateProduct(id, name, price, amount, image, description) {
  await fetch(URL_PRODUCT + id, {
      method: 'PUT',
      body: JSON.stringify({
        name : name.value,
        price : price.value,
        amount : amount.value,
        image : image.value,
        description : description.value
      }),
      headers: {
          'Content-Type': 'application/json'
      }
  });
}



// function delete existing product by id in product table
async function deleteProduct(id) {
  await fetch(URL_PRODUCT + id, {
      method: 'DELETE'
  })
}

