
import {postHttp,getHttp} from './http.js';
import {getBooks} from './printListBooks.js';

export {showLogin, logout};

function showLogin(){
    let cards = '<div class="w-100 d-flex justify-content-center">';
    cards+=
     `<div class="card border-primary p-2" style="max-width: 30rem;">
        <div class="card-header text-center">Введите логин и пароль</div>
        <div class="card-body">
          <p class="card-text d-flex justify-content-between">Логин: <input class="ml-2" type="text" id="login"></p>
          <p class="card-text d-flex justify-content-between">Пароль: <input class="ml-2" type="text" id="password"></p>
          <p class="card-text"><button class="btn btn-light w-100" type="button" id="btnEnter">Войти</button</p>
        </div>
      </div>`;
    cards +='</div>';
  document.getElementById('content').innerHTML = cards;
  document.getElementById('btnEnter').onclick = function(){
    auth();
  };
}

function auth(){
    let login = document.getElementById('login').value;
    let password = document.getElementById('password').value;
    let data = {
        'login': login,
        'password': password
    }
    postHttp('loginJson',data)
          .then(function(response) {  // response содержит ответ сервера преобразованный в js объект 
            if(response.authStatus==='true'){
              localStorage.setItem('token',response.token);
              localStorage.setItem('user',response.user);
              getBooks();
              document.getElementById('info').innerHTML = 'Вы вошли как '+response.user.login;
              document.getElementById('showLogin').style.display = 'none';
              document.getElementById('sysout').style.display = 'block';
            }else{
              document.getElementById('info').innerHTML = 'Войти не удалось';
              printLoginForm();
              document.getElementById('showLogin').style.display = 'block';
              document.getElementById('sysout').style.display = 'none';
            }
            console.log('Request succeeded with JSON response', response);  
          })
}
function logout(){
    getHttp('logoutJson')
          .then(function(response) {  // response содержит ответ сервера преобразованный в js объект 
            if(response.authStatus === 'false'){
              if(localStorage.getItem('token') !== null){
                  localStorage.removeItem('token');
              }
              if(localStorage.getItem('user') !== null){
                  localStorage.removeItem('user');
              }
              getBooks();
              document.getElementById('info').innerHTML = 'Вы вышли';
              document.getElementById('showLogin').style.display = 'block';
              document.getElementById('sysout').style.display = 'none';
            }else{
              document.getElementById('info').innerHTML = 'Ошибка при выходе пользователя';
            }
            console.log('Request succeeded with JSON response', response);  
          })
}