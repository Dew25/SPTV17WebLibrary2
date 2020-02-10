export {getHttp};
function getHttp(url,func){
    fetch(url)// возвращает ожидание (ответ на посланный запрос), 
              // которое дальше обрабатывается по цепочке
            .then(status)
            .then(json)
            .then(function(data) {  // data содержит ответ сервера преобразованный в js объект 
                func(data); // запускается функция с параметром
                console.log('Request succeeded with JSON response', data);  //вывод в консоль для дебага
            }).catch(function(error) { //срабатывает при ошибке пришедшей с сервера
                console.log('Request failed', error);  
            });
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