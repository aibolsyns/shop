const doc = document, math = Math;
let favorites = (sessionStorage['favorites'] === undefined || sessionStorage['favorites'] === null) ? [] : JSON.parse(sessionStorage['favorites']);
const user = JSON.parse(sessionStorage['current-user']);
doc.getElementById('username').innerText = 'Username: ' + user['username'];
doc.getElementById('email').innerText = 'Email: ' + user['email'];

function addProduct(product)
{
    let item = doc.createElement('img');
    item.src = product['image1'];
    item.classList.add('product-img');
    doc.getElementById('favorite-items').appendChild(item);
}

for(let i = 0; i < favorites.length; ++i)
{
    addProduct(favorites[i]);
}