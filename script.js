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

const Fruit = (fruit) => (`
    <li>
      <h2>${fruit.name}</h2>
      <h4>${fruit.calories}</h4>
      <div>
        <img src="${fruit.photo}" alt="fruit" width="200"/>
      </div>
    </li>
  `
)

const renderFruits = (fruits) => {
  const olSelector = document.querySelector('#fruits-list');
  fruits.forEach((fruit) => {
    olSelector.innerHTML += Fruit(fruit);
  });
}

window.onload = async () => {
  const fruits = await getFruits();
  renderFruits(fruits);
}