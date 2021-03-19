const doc = document, math = Math;
const product = JSON.parse( sessionStorage['product']);
const img1 = doc.createElement('img');
const img2 = doc.createElement('img');
img1.src = product['image1'];
img2.src = product['image2'];
img1.id = 'product-image1';
img2.id = 'product-image2';
doc.getElementById('product-price').innerText += product['price'] + '$';
doc.getElementById('product-model').innerText += product['model'];
doc.getElementById('product-block').insertBefore(img2, doc.getElementById('info'));
doc.getElementById('product-block').insertBefore(img1, img2);

doc.getElementById('adder').onclick = function(event)
{
    let basket = sessionStorage['basket'] === undefined ? [] : JSON.parse(sessionStorage['basket']);
    basket.push(product);
    sessionStorage['basket'] = JSON.stringify(basket);
}