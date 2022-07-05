function showLoginForm() {
    bdy.html(`
<div class="login-page">
  <div class="form">
    <div id="login-form">
      <input type="text" placeholder="username" id="username">
      <input type="password" placeholder="password" id="password">
      <button onclick="login()">login</button>
      <p class="message">Not registered? <a href="#" onclick="showRegisterForm()">Create an account</a></p>
    </div>
  </div>
</div>`)
}

function login() {
    let username = $("#username")
    let password = $("#password")
    let user = {
        "username": username.val(),
        "password": password.val()
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: 'Post',
        url: "http://localhost:8080/login",
        data: JSON.stringify(user),
        success: function (data) {
            token = data.accessToken
            localStorage.setItem(storageKey, JSON.stringify(token))
            localStorage.setItem("id", JSON.stringify(data.id))
            showHome()
        },
    })
}

function showRegisterForm() {
    bdy.html(`
<div class="login-page">
  <div class="form">
    <div class="login-form">
      <input type="text" placeholder="name" id="name">
      <input type="text" placeholder="username" id="username">
      <input type="password" placeholder="password" id="password">
      <input type="password" placeholder="confirm password" id="confirmPassword">
      <button onclick="register()">create</button>
      <p class="message">Already registered? <a href="#" onclick="showLoginForm()">Sign In</a></p>
    </div>
  </div>
</div>`)
}

function register() {
    let name = $("#name")
    let username = $("#username")
    let password = $("#password")
    let confirmPassword = $("#confirmPassword")
    let user = {
        "name": name.val(),
        "username": username.val(),
        "password": password.val(),
        "confirmPassword": confirmPassword.val()
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: 'Post',
        url: "http://localhost:8080/register",
        data: JSON.stringify(user),
        success: function (data) {
            token = data.accessToken
            localStorage.setItem(storageKey, JSON.stringify(token))
            localStorage.setItem("id", JSON.stringify(data.id))
            showHome()
        }
    })
}