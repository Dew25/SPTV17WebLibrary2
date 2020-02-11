import {json, status} from './header.js';
export {showLogin,auth};

function showLogin(){
        document.getElementById("content").innerHTML =
               `<div class="card border-0 w-80" >
                    <h3>Вход в систему</h3>
                    <form action="login" onsubmit="false" method="POST">
                      <div class="form-group">
                        <label for="login">Логин:</label>
                        <input type="text" class="form-control" id="login" name="login" aria-describedby="emailHelp" placeholder="Enter login">
                      </div>
                      <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" id="password" name="password" placeholder="Password">
                      </div>
                      <button type="button" id="btnEnter" class="btn btn-primary w-100">Войти</button>
                    </form><br>
                    <p class="alert alert-primary" role="alert">У вас нет логина? <a href="newReader">Зарегистрируйтесь</a></p>
                </div>`;
    document.getElementById('btnEnter').onclick = function (){
        auth();
    }
}
function auth(){
    let login = document.getElementById('login').value;
    let password = document.getElementById('password').value;
    let data = {
        'login': login,
        'password': password
    }
    fetch('loginJson',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(status)  
          .then(json)  
          .then(function(data) {  // data содержит ответ сервера преобразованный в js объект 
            if(data.loginStatus){
                document.getElementById('info').innerHTML="Вы авторизовались как "+data.user.login;
                localStorage.setItem('token',data.token);
                localStorage.setItem('user',data.user);
                document.getElementById('menu1').click();
            }else{
                document.getElementById('info').innerHTML="Авторизация не удалась";
                showLogin();
            }
            console.log('Request succeeded with JSON response', data);  //вывод в консоль для дебага
          }).catch(function(error) { //срабатывает при ошибке пришедшей с сервера
            console.log('Request failed', error);  
          });
}

