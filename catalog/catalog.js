const doc = document, math = Math;
let data = {}, left = 0, right = 1e12;
let favorites = sessionStorage.getItem('favorites') === undefined || sessionStorage.getItem('favorites') === null  ? [] : JSON.parse(sessionStorage['favorites']);

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

function clearList()
{
    if(doc.getElementById('result-block').children !== null)
    {
        while(doc.getElementById('result-block').children.length > 1)
        {
            doc.getElementById('result-block').children[1].remove();
        }
    }
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
    div.append(item, like);
    doc.getElementById('result-block').appendChild(div);
}

function searchFrom(category, priceBegin, priceEnd)
{
    let array = [];
    for(let i = 0; i < data['face'].length; ++i)
    {
        array.push(data['face'][i]);
    }
    for(let i = 0; i < data['eye'].length; ++i)
    {
        array.push(data['eye'][i]);
    }
    for(let i = 0; i < data['lip'].length; ++i)
    {
        array.push(data['lip'][i]);
    }
    priceBegin = parseInt(priceBegin);
    priceEnd = parseInt(priceEnd);
    if(priceEnd === null)
    {
        priceEnd = 1e12;
    }
    if(priceBegin === null)
    {
        priceBegin = 0;
    }
    if(array !== undefined)
    {
        for(let i = 0; i < array.length; ++i)
        {
            if(priceBegin <= array[i]['price'] && array[i]['price'] <= priceEnd && array[i]['model'].indexOf(category) != -1)
            {
                addProduct(array[i], category);
            }
        }
    }
    doc.getElementsByTagName('footer')[0].style.bottom = 'calc(-100vh - ' + innerHeight + 'px)';
}

doc.getElementById('price-begin').oninput = function(event)
{
    if(this.value.length == 0)
    {
        left = 0;
    }
    else
    {
        left = math.max(parseInt(this.value), 0);
    }
    clearList();
    if(doc.getElementById('category').value.length > 0)
    {
        searchFrom(doc.getElementById('category').value, left, right);
    }
    if(doc.getElementById('result-block').children === null || doc.getElementById('result-block').children.length <= 1)
    {
        searchFrom('', left, right);
    }
}

doc.getElementById('price-end').oninput = function(event)
{
    if(this.value.length == 0)
    {
        right = 1e12;
    }
    else
    {
        right = math.max(0, math.min(parseInt(this.value), 1e12));
    }
    clearList();
    if(doc.getElementById('category').value.length > 0)
    {
        searchFrom(doc.getElementById('category').value, left, right);
    }
    if(doc.getElementById('result-block').children === null || doc.getElementById('result-block').children.length <= 1)
    {
        searchFrom('', left, right);
    }
}

doc.getElementById('category').oninput = function(event)
{
    clearList();
    if(doc.getElementById('category').value.length > 0)
    {
        searchFrom(doc.getElementById('category').value, left, right);
    }
    if(doc.getElementById('result-block').children === null || doc.getElementById('result-block').children.length <= 1)
    {
        searchFrom('', left, right);
    }
}

function init()
{
    getData('face');
    getData('eye');
    getData('lip');
}

init();