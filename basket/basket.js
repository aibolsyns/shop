const doc = document, math = Math;
let basket = (sessionStorage['basket'] === undefined || sessionStorage['basket'] === null) ? [] : JSON.parse(sessionStorage['basket']);

function printBasket()
{
    while(doc.getElementById('products-list').hasChildNodes())
    {
        doc.getElementById('products-list').firstChild.remove();
    }
    for(let i = 0; i < basket.length; ++i)
    {
        const div = doc.createElement('div');
        const img = doc.createElement('img');
        const price = doc.createElement('h3');
        const model = doc.createElement('h3');
        img.src = basket[i]['image1'];
        price.innerText = 'Price: ' + basket[i]['price'];
        model.innerText = 'Model: ' + basket[i]['model'];
        img.classList.add('product-img');
        price.classList.add('product-price');
        model.classList.add('product-model');
        div.append(img, price, model);
        div.classList.add('product');
        doc.getElementById('products-list').appendChild(div);
    }
}

printBasket();