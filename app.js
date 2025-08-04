
import { getMainUser,getQuote,getPokemon,getAbout,getFriends,UserPage } from "./model.js";
import { renderUserPage } from "./view.js";




document.getElementById("generate-btn").addEventListener("click", async () => {
  const userPage = await getUserPage();
  renderUserPage(userPage);
});



async function getUserPage() {
    const mainUser = await getMainUser();
    const quote = await getQuote();
    const pokemon = await getPokemon();
    const about = await getAbout();
    const friends = await getFriends();

    return new UserPage(mainUser, quote, pokemon, about, friends);
}


getUserPage().then(renderUserPage);

document.addEventListener("DOMContentLoaded", async () => {
  const userPage = await getUserPage();
  renderUserPage(userPage);
  document.body.classList.add("loaded");
});
