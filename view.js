export function renderUserPage(userPage) {
  // משתמש ראשי
  document.getElementById("user-picture").src = userPage.mainUser.picture;
  document.getElementById("user-name").textContent =
    userPage.mainUser.firstName + " " + userPage.mainUser.lastName;
  document.getElementById("user-location").textContent =
    userPage.mainUser.city + ", " + userPage.mainUser.state;

  // ציטוט של Kanye
  document.getElementById("kanye-quote").textContent = userPage.quote;

  // פוקימון
  document.getElementById("pokemon-name").textContent = userPage.pokemon.name;
  document.getElementById("pokemon-image").src = userPage.pokemon.image;

  // טקסט על המשתמש
  document.getElementById("about-text").textContent = userPage.about;

  // חברים
  const list = document.getElementById("friends-list");
  list.innerHTML = "";
  for (let name of userPage.friends) {
    const li = document.createElement("li");
    li.textContent = name;
    list.appendChild(li);
  }
}
