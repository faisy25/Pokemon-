//

const container = document.querySelector(".container");
const h1 = document.createElement("h1");
h1.innerText = "POKEMON CARDS";
container.append(h1);

const form = document.querySelector("form");

const inputSearch = document.createElement("input");
inputSearch.setAttribute("name", "search");
inputSearch.setAttribute("type", "text");
inputSearch.setAttribute("class", "search");
inputSearch.setAttribute("placeholder", "Search your favourite POKEMON");
form.append(inputSearch);

const buttonSearch = document.createElement("button");
buttonSearch.innerText = "Search";
buttonSearch.setAttribute("class", "btn-group");
form.append(buttonSearch);

const back = document.createElement("button");
back.setAttribute("class", "btn-group");

const buttons = document.querySelector(".buttons");
const a = document.createElement("a");
a.innerText = "Back";
a.setAttribute("href", "index.html");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (e.target.elements.search.vaue == "") {
    console.log("clicked");
  } else {
    next.remove();
    prev.remove();

    rootdiv.innerHTML = "";

    const searchPok = e.target.elements.search.value;
    e.target.elements.search.value = "";
    let url = `https://pokeapi.co/api/v2/pokemon/${searchPok.toLowerCase()}`;
    console.log(url);
    axios
      .get(url)
      .then((data) => {
        const pokemons = data.data;
        // console.log(pokemons);
        adding(
          pokemons.sprites.other.home.front_default,
          pokemons.name,
          pokemons.id,
          pokemons.moves[0].move.name,
          pokemons.base_experience,
          pokemons.abilities[0].ability.name,
          pokemons.height,
          pokemons.weight
        );
      })
      .catch((err) => {
        rootdiv.innerHTML = `<h2>Not found</h2>`;
      });
  }

  back.append(a);
  buttons.append(back);
  //   const pokSearch = document.createElement("p");
});
back.remove();
container.append(form);

const rootdiv = document.querySelector(".root");

function adding(src, nme, id, mve, exp, abi, heig, weig) {
  const card = document.createElement("div");
  card.setAttribute("class", "card");

  let pokImg = document.createElement("img");
  pokImg.setAttribute("src", src);

  let pokName = document.createElement("h3");
  pokName.innerText = `Name: ${nme}`;

  let pokId = document.createElement("h3");
  pokId.innerText = `Id: ${id}`;

  let pokMove = document.createElement("h3");
  pokMove.innerText = `Moves: ${mve}`;

  let pokExperience = document.createElement("h3");
  pokExperience.innerText = `Experience: ${exp}`;

  let pokAbility = document.createElement("h3");
  pokAbility.innerText = `Ability: ${abi}`;

  let pokHeight = document.createElement("h3");
  pokHeight.innerText = `Height: ${heig}`;

  let pokWeight = document.createElement("h3");
  pokWeight.innerText = `Weight: ${weig}`;

  card.append(pokImg);
  card.append(pokName);
  card.append(pokId);
  card.append(pokMove);
  card.append(pokExperience);
  card.append(pokAbility);
  card.append(pokHeight);
  card.append(pokWeight);

  rootdiv.append(card);
}
let pokemonName;
let pokemonId;
let pokemonMove;
let pokemonHeight;
let pokemonWeight;
let pokemonExperience;
let pokemonAbility;
let pokemonImage;

let start = 1;
let end = 20;

for (let i = start; i <= end; i++) {
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${i}`)
    .then(({ data }) => {
      pokemonName = data.name;
      pokemonId = data.id;
      pokemonMove = data.moves[0].move.name;
      pokemonExperience = data.base_experience;
      pokemonAbility = data.abilities[0].ability.name;
      pokemonImage = data.sprites.other.home.front_default;
      pokemonHeight = data.height;
      pokemonWeight = data.weight;
      //   console.log(data);

      adding(
        pokemonImage,
        pokemonName,
        pokemonId,
        pokemonMove,
        pokemonExperience,
        pokemonAbility,
        pokemonHeight,
        pokemonWeight
      );
    })

    .catch((err) => console.log(err));
}

let prev = document.querySelector(".prev");
let next = document.querySelector(".next");

prev.disabled = true;

async function nextData(start, end) {
  for (let i = start; i <= end; i++) {
    const pokemon = axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
    pokemon.then((data) => {
      //   console.log(data.data.name);
      //   console.log(data);

      const pokemons = data.data;
      // pokemonName = pokemons.name;
      // pokemonId = pokemons.id;
      // pokemonMove = pokemons.moves[0].move.name;
      // pokemonExperience = pokemons.base_experience;
      // pokemonAbility = pokemons.abilities[0].ability.name;
      // pokemonImage = pokemons.sprites.other.home.front_default;
      // pokemonHeight = pokemons.height;
      // pokemonWeight = pokemons.weight;

      // adding(
      //   pokemonImage,
      //   pokemonName,
      //   pokemonId,
      //   pokemonMove,
      //   pokemonExperience,
      //   pokemonAbility,
      //   pokemonHeight,
      //   pokemonWeight
      // );
      adding(
        pokemons.sprites.other.home.front_default,
        pokemons.name,
        pokemons.id,
        pokemons.moves[0].move.name,
        pokemons.base_experience,
        pokemons.abilities[0].ability.name,
        pokemons.height,
        pokemons.weight
      );
    });
  }
}

next.addEventListener("click", (e) => {
  rootdiv.innerHTML = "";

  start = start + 20;
  end = end + 20;

  console.log("clicked");

  nextData(start, end);

  prev.disabled = false;

  // console.log(start);
  // console.log(end);
});
next.addEventListener("click", (e) => {
  rootdiv.innerHTML = "";

  start = start + 20;
  end = end + 20;

  // console.log("clicked");

  nextData(start, end);

  prev.disabled = false;

  // console.log(start);
  // console.log(end);
});

prev.addEventListener("click", (e) => {
  rootdiv.innerHTML = "";

  start = start - 20;
  end = end - 20;

  if (start <= 1) {
    prev.disabled = true;
  }

  nextData(start, end);
  // console.log(start);
  // console.log(end);
});

// next.addEventListener("click", (e) => {
//   // console.log("clicked");
//   // start = start + 20; // 21
//   // end = end + 20; // 40

//   nextData(start, end);
// });
