const doc = document, math = Math;
let isLogin = false;
let users = [];

doc.getElementById('login-reg-swapper').onclick = function(event)
{
    if(isLogin)
    {
        doc.getElementById('registration-block').style.visibility = 'visible';
        doc.getElementById('login-block').style.visibility = 'hidden';
        event.target.innerText = 'Login';
    }
    else
    {
        doc.getElementById('registration-block').style.visibility = 'hidden';
        doc.getElementById('login-block').style.visibility = 'visible';
        event.target.innerText = 'Registration';
    }
    isLogin = !isLogin;
}

function getData()
{
    fetch('https://my-json-server.typicode.com/aibolsyns/mock-server/users').then(function(resp)
    {
        return resp.json();
    }).then(function(data)
    {
        users = data;
    });
}

function hasUser(mail)
{
    for(let i = 0; i < users.length; ++i)
    {
        if(users[i]['email'] == mail)
        {
            return true;
        }
    }
    return false;
}

function check()
{
    const mail = doc.getElementById('reg-email'), pass = doc.getElementById('reg-password'), repass = doc.getElementById('reg-repassword');
    const emailCheck = /.+\@\w+\.\w+/.test(mail.value) && /[^\s]/.test(mail.value);
    const passwordCheck = /([a-zA-Z]+\d+|\d+[a-zA-Z]+)/.test(pass.value) && /[^\s]/.test(pass.value);
    const repasswordCheck = /([a-zA-Z]+\d+|\d+[a-zA-Z]+)/.test(pass.value) && /[^\s]/.test(repass.value);
    if(pass.value.length >= 8 && emailCheck && passwordCheck && repasswordCheck)
    {
        if(!hasUser(mail.value))
        {
            const xhr = new XMLHttpRequest();
            const current = {id: users.length + 1, username: doc.getElementById('reg-username').value, email: mail.value, password: pass.value};
            users.push(current);
            xhr.open('POST', 'https://my-json-server.typicode.com/aibolsyns/mockjson/users', true);
            xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
            xhr.onreadystatechange = function()
            {
                if(this.readyState == XMLHttpRequest.DONE)
                {
                    sessionStorage['current-user'] = JSON.stringify(current);
                    doc.location.href = '../catalog/catalog.html';
                }
            }
            xhr.send(JSON.stringify(users));
        }
        else
        {
            alert('User with this email already exist')
        }
    }
    else
    {
        alert('Email or password is wrong')
    }
}

function checkLogin()
{
    const email = doc.getElementById('email').value, pass = doc.getElementById('password').value;
    let found = false;
    for(let i = 0; i < users.length; ++i)
    {
        if(users[i].password === pass && users[i].email === email)
        {
            found = true;
            sessionStorage['current-user'] = JSON.stringify(users[i]);
            doc.location.href = '../catalog/catalog.html';
        }
    }
    if(!found)
    {
        alert('Email or password incorrect')
    }
}
getData();