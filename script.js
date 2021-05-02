const URL = 'http://pocs.digitalpages.com.br/mock/api/fruits-api/fruits.json';

// Options do fetch
const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json'
  },
};

// Pega as frutas
/* const getFruits = async () => {
  const response = await fetch(URL, options);
  const fruits = await response.json();
  return fruits;
}; */

const getFruits = async () => await fetch(URL, options).then(data => data.json());

// const getFruits = async () => await (await fetch(URL, options)).json();

// Componente Fruit
/* const Fruit = (fruit) => (`
    <li>
      <h2>${fruit.name}</h2>
      <h4>${fruit.calories}</h4>
      <div>
        <img src="${fruit.photo}" alt="fruit" width="200"/>
      </div>
      <button type="button" id="favorite">Adicionar a Favoritos</button>
    </li>
  `
) */

let localStorageFruits = [];
// let localStorageFavoriteFruits = [];

const addFruitsToLocalStorage = (fruits) => {
  localStorage.setItem('fruits', JSON.stringify(fruits));
  localStorageFruits = [...fruits];
};

const addFruitToFavorites = (index) => {
  // Pega a lista de favoritos do LocalStorage
  const localStorageFavoriteFruits = JSON.parse(localStorage.getItem('favoriteFruits'));
  
  // Verifica se a lista existe e se há alguma fruta nela
  if (!!localStorageFavoriteFruits && localStorageFavoriteFruits.length > 0) {
    const isFavorited = localStorageFavoriteFruits.some((fruit) => fruit === localStorageFruits[index]);

    console.log(isFavorited);
    
    if (isFavorited) return false;

    const toLocalStorageFF = [...localStorageFavoriteFruits, localStorageFruits[index]];
    console.log(localStorageFavoriteFruits);
    localStorage.setItem('favoriteFruits', JSON.stringify(toLocalStorageFF));
    return true
  }

  // Cria um array com apenas uma fruta e adiciona ao Local Storage
  const fruit = localStorageFruits[index];
  const newFruitList = [fruit];
  localStorage.setItem('favoriteFruits', JSON.stringify(newFruitList));
  return true
};

// Componente Fruit
const Fruit = (fruit, index) => {
  const fruitElement = document.createElement('li')
  fruitElement.innerHTML = `
    <h2>${fruit.name}</h2>
    <h4>${fruit.calories}</h4>
    <div>
      <img src="${fruit.photo}" alt="fruit" width="200"/>
    </div>
  `
  const button = document.createElement('button');
  button.innerText = 'Add to Favorites';
  button.addEventListener('click', () => {
    addFruitToFavorites(index);
  })
  fruitElement.appendChild(button);
  return fruitElement;
};

// Renderiza as frutas na tela
const renderFruits = (fruits) => {
  const olSelector = document.querySelector('#fruits-list');
  fruits.forEach((fruit, index) => {
    olSelector.appendChild(Fruit(fruit, index));
  });
};

const verifyLocalStorageFruits = async () => {
  const localStorageFruits = JSON.parse(localStorage.getItem('fruits'));
  return !!localStorageFruits ? localStorageFruits : await getFruits();
}

window.onload = async () => {
  const fruits = await verifyLocalStorageFruits();
  addFruitsToLocalStorage(fruits);
  renderFruits(fruits);
};
