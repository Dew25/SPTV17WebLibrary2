import {getHttp} from './http.js';


export {getBooks};
function getBooks(){
    getHttp("getListNewBooks")
          .then(function(data) {  // data содержит ответ сервера преобразованный в js объект 
            printListNewBooks(data); // запускается функция с параметром
            console.log('Request succeeded with JSON response', data);  //вывод в консоль для дебага
          });
}
function printListNewBooks(data){
    let content = document.getElementById('content');
    
    let cards = '';
    for(let i = 0; i < data.books.length; i++){
        cards +=
        `<div class="card w-25 m-3" >
            <div class="card-body">
                <h5 class="card-title">${data.books[i].caption}</h5>
                <p class="card-text">${data.books[i].author}. ${data.books[i].publishedYear}</p>
                <a href="buyBook?bookId=${data.books[i].id}" class="btn btn-primary">Купить книгу</a>
            </div>
        </div>`;
    }
    content.innerHTML = cards;
    let title = document.createElement("h3");
    title.innerHTML = "Новые книги";
    title.classList.add('w-100');
    title.classList.add('text-center');
    content.prepend(title);
}

