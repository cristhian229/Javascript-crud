const form = document.querySelector("form")
const password = document.querySelector("#password")
const username = document.querySelector("#username")

const URL = 'http://localhost:3000/user'

async function validateUsername(username){
  const response = await fetch(`${URL}?username=${username.value}`)
  const data = await response.json()

  if(data.length > 0){
    return data[0]
  }else{
    return false
  }
}

// submit event listener for login 
form.addEventListener("submit", async (event) =>{
  event.preventDefault()
  const user = await validateUsername(username)
  if(user === false){
    alert("The username is not registed")
  }else{
    if(password.value == user.password){
      localStorage.setItem("userOnline", JSON.stringify(user))
      window.location.href = "../pages/dashboard.html"
      alert("welcome")
    }else{
      alert("incorrect password")
    }
  }
})
