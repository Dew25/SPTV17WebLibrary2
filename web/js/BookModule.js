
import {getHttp,postHttp} from './HttpModule.js';

export {listBooks, addNewBook};
   
    function listBooks(){
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
            `<div class="card w-25 m-3 d-flex justify-content-between" >
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
    function addNewBook(){
        let formNewBook =
        `<div class="card w-85 m-3 d-flex justify-content-between" >
                <div class="card-body>
                    <h5 class="card-title">Заполните все поля:</h5>
                    <p class="card-text">Название книги: 
                        <input type="text" id="caption" value="">
                    </p>
                    <p class="card-text">Автор книги: 
                        <input type="text" id="author" value="">
                    </p>
                    <p class="card-text">Год издания: 
                        <input type="text" id="publishedYear" value="">
                    </p>
                    <p class="card-text">Обложка книги: 
                        <input type="text" id="cover" value="">
                    </p>
                    <p class="card-text">Текст книги: 
                        <input type="text" id="textBook" value="">
                    </p>
                    <button class="btn btn-primary" id="btnAddBook">Добавить книгу</button>
                </div>
            </div>`;
        document.getElementById('content').innerHTML = formNewBook;
        document.getElementById('btnAddBook').onclick = function(){
            createBook();
        }
        function createBook(){
            let caption = document.getElementById('caption').value;
            let author = document.getElementById('author').value;
            let publishedYear = document.getElementById('publishedYear').value;
            let cover = document.getElementById('cover').value;
            let textBook = document.getElementById('textBook').value;
            let book = {
                'caption': caption,
                'author': author,
                'publishedYear': publishedYear,
                'cover': cover,
                'textBook': textBook
            }
            postHttp('addBook',book)
                    .then(function(response){
                      if(response.actionStatus === 'true'){
                          document.getElementById('info').innerHTML='Книга добавлена';
                      }else{
                          document.getElementById('info').innerHTML='Книгу добавить не удалось';
                      } 
                      listBooks();
                    });
                
        }
    }



