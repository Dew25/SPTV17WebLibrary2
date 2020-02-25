import {getHttp,postHttp} from './HttpModule.js';

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
        let listAddress = '{';
        for(let i=0;i<data.customers.length;i++){
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
`<div class="card" style="width: 65rem;">
  <div class="card-body d-flex justify-content-center">
    <h5 class="card-title">Новый пользователь</h5>
    <p class="card-text d-flex justify-content-between">Имя: <input class="ml-2" type="text" id="firstname"></p>
    <p class="card-text d-flex justify-content-between">Фамилия: <input class="ml-2" type="text" id="lastname"></p>
    <p class="card-text d-flex justify-content-between">День рождения: <input class="ml-2" type="text" id="day"></p>
    <p class="card-text d-flex justify-content-between">Месяц рождения: <input class="ml-2" type="text" id="month"></p>
    <p class="card-text d-flex justify-content-between">Год рождения: <input class="ml-2" type="text" id="year"></p>
    <p class="card-text d-flex justify-content-between">Страна: <input class="ml-2" type="text" id="cantry"></p>
    <p class="card-text d-flex justify-content-between">Город: <input class="ml-2" type="text" id="city"></p>
    <p class="card-text d-flex justify-content-between">Улица: <input class="ml-2" type="text" id="street"></p>
    <p class="card-text d-flex justify-content-between">Дом: <input class="ml-2" type="text" id="house"></p>
    <p class="card-text d-flex justify-content-between">Квартира: <input class="ml-2" type="text" id="room"></p>
    <p class="card-text d-flex justify-content-between">Логин: <input class="ml-2" type="text" id="login"></p>
    <p class="card-text d-flex justify-content-between">Пароль: <input class="ml-2" type="text" id="password"></p>
    <p class="card-text"><button class="btn btn-light w-100" type="button" id="btnAddCustomer">Добавить</button</p>
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
    let room = document.getElementById('room').value;
    let login = document.getElementById('login').value;
    let password = document.getElementById('password').value;
    let customer = {
       "firstname": firstname,
       "lastname": lastname,
       "day": day,
       "month": month,
       "year": year,
       "cantry": cantry,
       "city": city,
       "street": street,
       "room": room,
       "login": login,
       "password": password,
    }
    postHttp('createCustomerJson',customer)
          .then(function(response){ // response содержит ответ сервера преобразованный в js объект 
            if(response.authStatus === 'true'){
              localStorage.setItem('token',response.token);
              localStorage.setItem('user',response.user);
              document.getElementById('info').innerHTML = 'Новый пользователь добавлен';
            }else{
              document.getElementById('info').innerHTML = 'Ошибка при добавлении пользователя';
            }
            listBooks();
            console.log('Request succeeded with JSON response', response);  
          })

}

