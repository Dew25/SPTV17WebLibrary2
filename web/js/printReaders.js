import {getHttp} from './http.js';

export {getReaders};

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
            `<div class="card w-30 m-3" >
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

