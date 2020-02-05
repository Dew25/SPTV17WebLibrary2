"use strict";
//navigation menu
document.getElementById('menu1').onclick=function (){
    toogleActiveLink("menu1");
    fetch("getListNewBooks")
          .then(status)  
          .then(json)  
          .then(function(data) {  
            printListNewBooks(data);
            console.log('Request succeeded with JSON response', data);  
          }).catch(function(error) {  
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
function status(response) {  
  if (response.status >= 200 && response.status < 300) {  
    return Promise.resolve(response)  
  } else {  
    return Promise.reject(new Error(response.statusText))  
  }  
}

function json(response) {  
  return response.json();
};
function printListNewBooks(data){
    let content = document.getElementById('content');
    let cards = '';
    for(let i = 0; i < data.length; i++){
        cards +=
        `<div class="card w-25" >
            <div class="card-body">
                <h5 class="card-title">${data[i].name}</h5>
                <p class="card-text">${data[i].author}. ${data[i].publishedYear}</p>
                <a href="buyBook?bookId=${data[i].id}" class="btn btn-primary">Купить книгу</a>
            </div>
        </div>`;
    }
    content.innerHTML = cards;
}

