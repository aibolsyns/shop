const doc = document, math = Math;
let data = {};
let favorites = sessionStorage['favorites'] === null || sessionStorage['favorites'] === undefined ? [] : JSON.parse(sessionStorage['favorites']); 

function getData(category)
{
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://my-json-server.typicode.com/aibolsyns/mock-server/' + category, true);
    xhr.onreadystatechange = function(event)
    {
        if(this.readyState == 4 && this.status == 200)
        {
            data[category] = JSON.parse(this.responseText);
        }
    }
    xhr.send();
}

function addProduct(product)
{
    let div = doc.createElement('div');
    div.classList.add('container');
    let item = doc.createElement('img');
    item.src = product['image1'];
    item.classList.add('product-img');
    item.onclick = function(event)
    {
        sessionStorage['product'] = JSON.stringify(product);
        doc.location = '../product/product.html';
    }
    let like = doc.createElement('img');
    like.src = '../icons/like.png';
    like.classList.add('like-icon');
    like.onclick = function(event)
    {
        favorites.push(product);
        sessionStorage['favorites'] = JSON.stringify(favorites);
        like.src = '../icons/liked.png';
    }
    let span = doc.createElement('span');
    span.classList.add('product-text');
    span.innerText = product['model'];
    div.append(item, like, span);
    doc.getElementById('products').appendChild(div);
}

function printProducts(category)
{
    let array = data[category];
    for(let i = 0; i < array.length; ++i)
    {
        addProduct(array[i], category);
    }
    doc.getElementsByTagName('footer')[0].style.bottom = 'calc(-100vh - ' + (innerHeight * 1.5) + 'px)';
}


function init()
{
    getData('face');
    getData('eye');
    getData('lip');
    setTimeout(function(e)
    {
        printProducts('face');
        printProducts('eye');
        printProducts('lip');
    }, 5000);
}

init();