
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
                `<div class="card w-50">
                    <div class="card-body">
                      <h5 class="card-title w-100 text-center">Новая Книга</h5>
                      <div class="card-text">
                        <div class="form-group">
                          <label for="caption">Название книги</label>
                          <input type="text" class="form-control" id="caption">
                        </div>
                        <div class="form-group">
                          <label for="author">Автор книги</label>
                          <input type="text" class="form-control" id="author">
                        </div>
                        <div class="form-group">
                          <label for="publishedYear">Год издания</label>
                          <input type="text" class="form-control" id="publishedYear">
                        </div>
                        <div class="form-group">
                          <label for="cover">Обложка книги</label>
                          <input type="text" class="form-control" id="cover">
                        </div>
                        <div class="form-group">
                          <label for="textBook">Текст книги</label>
                          <input type="text" class="form-control" id="textBook">
                        </div>
                        
                        <button class="btn bg-primary w-100" type="button" id="btnAddBook">Добавить</button>
                      </div>
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



