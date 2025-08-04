export class UserPage {
  constructor(mainUser, quote, pokemon, about, friends) {
    this.mainUser = mainUser;
    this.quote = quote;
    this.pokemon = pokemon;
    this.about = about;
    this.friends = friends;
  }
}

export async function getMainUser() {
  const response = await fetch('https://randomuser.me/api/?results=1');
  const data = await response.json();
  const user = data.results[0];
  return {
    firstName: user.name.first,
    lastName: user.name.last,
    city: user.location.city,
    state: user.location.state,
    picture: user.picture.large
  };
}

export async function getQuote() {
  const response = await fetch('https://api.kanye.rest');
  const data = await response.json();
  return data.quote;
}


export async function getPokemon() {
  const randomId = Math.floor(Math.random() * 1025) + 1;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
  const data = await response.json();
  
  return {
    name: data.name,
    image: data.sprites.front_default
  };
}


export async function getAbout() {
  const res = await fetch("https://baconipsum.com/api/?type=meat-and-filler");
  const data = await res.json();

  return data[0]; 
}


export async function getFriends() {
  const res = await fetch("https://randomuser.me/api/?results=6");
  const data = await res.json();

  const friends = [];

  for (let user of data.results) {
    const fullName = user.name.first + " " + user.name.last;
    friends.push(fullName);
  }

  return friends;
}
