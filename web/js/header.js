"use strict";
import login from 'js/login.js';
//navigation menu - нажатие на кнопку "Новые книги"
document.getElementById('menu1').onclick=function (){
    toogleActiveLink("menu1"); // делает текст нажатой ссылки жирным (css класс "active")
    fetch("getListNewBooks")// возвращает ожидание (ответ на посланный запрос), 
                            // которое дальше обрабатывается по цепочке
          .then(status)  
          .then(json)  
          .then(function(data) {  // data содержит ответ сервера преобразованный в js объект 
            printListNewBooks(data); // запускается функция с параметром
            console.log('Request succeeded with JSON response', data);  //вывод в консоль для дебага
          }).catch(function(error) { //срабатывает при ошибке пришедшей с сервера
            console.log('Request failed', error);  
          });
};
document.getElementById('menu2').onclick=function (){
    toogleActiveLink("menu2");
};
document.getElementById('menu3').onclick=function (){
    toogleActiveLink("menu3");
};
document.getElementById('menu4').onclick=function (){
    toogleActiveLink("menu4");
};

function toogleActiveLink(elementId){
    let activeElement = document.getElementById(elementId);
    let passiveElements = [
        document.getElementById('menu1'),
        document.getElementById('menu2'),
        document.getElementById('menu3'),
        document.getElementById('menu4')
        
    ];
    for(let i = 0;i < passiveElements.length; i++){
        if(activeElement === passiveElements[i]){
            passiveElements[i].classList.add("active");
        }else{
            if(passiveElements[i].classList.contains('active')){
                passiveElements[i].classList.remove('active');
            }
        }
    }
}
//Возвращает ожидание при статусе ответа 200 - 300, иначе возвращает ошибку,
// которую прислал сервер в ответе
function status(response) {  
  if (response.status >= 200 && response.status < 300) {  
    return Promise.resolve(response)  
  } else {  
    return Promise.reject(new Error(response.statusText))  
  }  
}
// Получает ответ в формате Json и формирует из него js объект
function json(response) {  
  return response.json();
};
function printListNewBooks(data){
    let content = document.getElementById('content');
    let cards = '';
    for(let i = 0; i < data.books.length; i++){
        cards +=
        `<div class="card w-25" >
            <div class="card-body">
                <h5 class="card-title">${data.books[i].caption}</h5>
                <p class="card-text">${data.books[i].author}. ${data.books[i].publishedYear}</p>
                <a href="buyBook?bookId=${data.books[i].id}" class="btn btn-primary">Купить книгу</a>
            </div>
        </div>`;
    }
    content.innerHTML = cards;
}

