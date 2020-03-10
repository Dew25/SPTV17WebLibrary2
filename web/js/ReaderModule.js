import {getHttp,postHttp} from './HttpModule.js';
import {listBooks} from './BookModule.js';

export {getReaders,printNewCustomerForm};

function getReaders(){
   getHttp("getListCustomers")
        .then(function(data) {  // data содержит ответ сервера преобразованный в js объект 
            if(data.authStatus === 'true'){
                printListCustomers(data); // запускается функция с параметром
                console.log('Request succeeded with JSON response', data);  //вывод в консоль для дебага 
            }else{
                document.getElementById('info').innerHTML = 'У вас нет прав, авторизуйтесь';
            }
            
          })
}
function printListCustomers(data){
    let content = document.getElementById('content');
    let cards = '';
        
        for(let i=0;i<data.customers.length;i++){
            let listAddress = '{';
            for(let j = 0; j < data.customers[i].address.length; j++){
                listAddress+=data.customers[i].address[j].cantry;
                listAddress+=', ';
                listAddress+=data.customers[i].address[j].city;
                listAddress+=', ';
                listAddress+=data.customers[i].address[j].street;
                listAddress+=', ';
                listAddress+=data.customers[i].address[j].house;
                listAddress+=', ';
                listAddress+=data.customers[i].address[j].room;
                listAddress+='},';
            }
            cards +=
            `<div class="card w-30 m-3 d-flex justify-content-between" style="max-width:300px">
                <div class="card-body">
                    <h5 class="card-title">${data.customers[i].firstname} ${data.customers[i].lastname}</h5>
                    <p class="card-text">Родился: ${data.customers[i].day}.${data.customers[i].month}.${data.customers[i].year}г. Телефон: ${data.customers[i].phone} </p>
                    <p class="card-text">Адресс: ${listAddress}</p>
                    <a href="buyBook?customerId=${data.customers[i].id}" class="btn btn-primary">Изменить данные</a>
                </div>
            </div>`;
        }
    content.innerHTML = cards;
}
function printNewCustomerForm(){
    let cards = 
                `<div class="card w-50">
                    <div class="card-body">
                      <h5 class="card-title w-100 text-center">Новый пользователь</h5>
                      <div class="card-text">
                        <div class="form-group">
                          <label for="firstname">Имя</label>
                          <input type="text" class="form-control" id="firstname">
                        </div>
                        <div class="form-group">
                          <label for="lastname">Фамилия</label>
                          <input type="text" class="form-control" id="lastname">
                        </div>
                        <div class="form-group">
                          <label for="day">День рождения</label>
                          <input type="text" class="form-control" id="day">
                        </div>
                        <div class="form-group">
                          <label for="month">Месяц рождения</label>
                          <input type="text" class="form-control" id="month">
                        </div>
                        <div class="form-group">
                          <label for="year">Год рождения</label>
                          <input type="text" class="form-control" id="year">
                        </div>
                        <div class="form-group">
                          <label for="cantry">Страна</label>
                          <input type="text" class="form-control" id="cantry">
                        </div>
                        <div class="form-group">
                          <label for="city">Город</label>
                          <input type="text" class="form-control" id="city">
                        </div>
                        <div class="form-group">
                          <label for="street">Улица</label>
                          <input type="text" class="form-control" id="street">
                        </div>
                        <div class="form-group">
                          <label for="house">Дом</label>
                          <input type="text" class="form-control" id="house">
                        </div>
                        <div class="form-group">
                          <label for="room">Квартира</label>
                          <input type="text" class="form-control" id="room">
                        </div>
                        <div class="form-group">
                          <label for="phone">Телефон</label>
                          <input type="text" class="form-control" id="phone">
                        </div>
                        <div class="form-group">
                          <label for="login">Логин</label>
                          <input type="text" class="form-control" id="login">
                        </div>
                        <div class="form-group">
                          <label for="password">Пароль</label>
                          <input type="text" class="form-control" id="password">
                        </div>
                        <button class="btn bg-primary w-100" type="button" id="btnAddCustomer">Добавить</button>
                      </div>
                    </div>
                </div>`;
    document.getElementById('content').innerHTML = cards;
    document.getElementById('btnAddCustomer').onclick = function(){
    createCustomer();
  };
}
function createCustomer(){
    let firstname = document.getElementById('firstname').value;
    let lastname = document.getElementById('lastname').value;
    let day = document.getElementById('day').value;
    let month = document.getElementById('month').value;
    let year = document.getElementById('year').value;
    let cantry = document.getElementById('cantry').value;
    let city = document.getElementById('city').value;
    let street = document.getElementById('street').value;
    let house = document.getElementById('house').value;
    let room = document.getElementById('room').value;
    let login = document.getElementById('login').value;
    let password = document.getElementById('password').value;
    let phone = document.getElementById('phone').value;
    let customer = {
       "firstname": firstname,
       "lastname": lastname,
       "day": day,
       "month": month,
       "year": year,
       "cantry": cantry,
       "city": city,
       "street": street,
       "house": house,
       "room": room,
       "phone": phone,
       "login": login,
       "password": password,
    }
    postHttp('createCustomerJson',customer)
          .then(function(response){ // response содержит ответ сервера преобразованный в js объект 
            if(response.actionStatus === 'true'){
              localStorage.setItem('user',response.user);
              document.getElementById('info').innerHTML = 'Новый пользователь добавлен';
            }else{
              document.getElementById('info').innerHTML = 'Ошибка при добавлении пользователя';
            }
            listBooks();
            console.log('Request succeeded with JSON response', response);  
          })

}

