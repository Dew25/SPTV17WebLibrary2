
import {getBooks} from './printListBooks.js';
import {getReaders} from './printReaders.js';
import {showLogin,logout} from './auth.js';

//navigation menu - нажатие на кнопку "Новые книги"
document.getElementById('showNewBooks').onclick=function (){
    toogleActiveLink("showNewBooks"); // делает текст нажатой ссылки жирным (css класс "active")
    getBooks();
};
document.getElementById('showReaders').onclick=function (){
    toogleActiveLink("showReaders");
    getReaders();
};
document.getElementById('sysout').onclick=function (){
    toogleActiveLink("sysout");
    logout();
};
document.getElementById('showLogin').onclick=function (){
    toogleActiveLink("showLogin");
    showLogin();
};

function toogleActiveLink(elementId){
    let activeElement = document.getElementById(elementId);
    let passiveElements = document.getElementsByClassName('nav-link');
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






