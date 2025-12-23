// ----- LOGIN & SIGNUP -----
let isLogin = true;

function toggleForm() {
  const formTitle = document.getElementById("formTitle");
  const toggleText = document.getElementById("toggleText");
  isLogin = !isLogin;

  formTitle.textContent = isLogin ? "Login" : "Sign Up";
  toggleText.innerHTML = isLogin
    ? `Don't have an account? <a href="#" onclick="toggleForm()">Sign Up</a>`
    : `Already have an account? <a href="#" onclick="toggleForm()">Login</a>`;
}

function handleAuth() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Please fill all fields!");
    return;
  }

  if (isLogin) {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser && savedUser.username === username && savedUser.password === password) {
      alert("Login Successful!");
      window.location.href = "shop.html";
    } else {
      alert("Invalid username or password!");
    }
  } else {
    const user = { username, password };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Account Created Successfully!");
    toggleForm();
  }
}

// ----- MOBILE SHOP SYSTEM -----
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addItem(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function displayCart() {
  const list = document.getElementById("cartList");
  if (!list) return;

  list.innerHTML = "";
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;
    list.appendChild(li);
  });
}

function generateBill() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById("billDetails").innerHTML = `
    <h3>Total Items: ${cart.length}</h3>
    <h3>Total Amount: ₹${total}</h3>
  `;
}

function clearCart() {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function resetCart() {
  clearCart();
  document.getElementById("billDetails").innerHTML = "";
}

function logout() {
  alert("You have logged out!");
  window.location.href = "index.html";
}

displayCart();
