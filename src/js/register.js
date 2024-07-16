const form = document.querySelector("form")
const name = document.querySelector("#name")
const username = document.querySelector("#username")
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const confirmPassword = document.querySelector("#confirm-password")

const URL = 'http://localhost:3000/user'

function validatePassword(password, confirmPassword){
  if(password.value == confirmPassword.value){
    return true;
  }else{
    alert("Passwords dont match")
    return false; 
  }
}


async function validateEmail(email){
  const response = await fetch(`${URL}?email=${email.value}`)
  const data = await response.json()

  if(data.length === 0){
    return true;
  }else{
    alert("email already registed")
    return false
  }
}


async function createUser(name, username,email,password){
  const newUser = {
    name: name.value,
    username: username.value,
    email: email.value,
    password:  password.value
  }
  await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newUser)
  })
}


form.addEventListener("submit", async (event) => {

  event.preventDefault()
  const checkedPassword = validatePassword(password, confirmPassword)
  const checkedEmail =  await validateEmail(email)



  if (checkedEmail == true && checkedPassword == true){
    await createUser(name, username,email,password)
    alert("user created")
    form.reset()
  }
})