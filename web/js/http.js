export {getHttp,postHttp};
function getHttp(url){
    return fetch(url)
          .then(status)  
          .then(json)  
          .catch(function(error) { //срабатывает при ошибке пришедшей с сервера
            console.log('Request failed', error);  
          });
}

function postHttp(url,data){
    return fetch(url,{
                        headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                     },
                     method: "POST",
                     body: JSON.stringify(data)
                 })
          .then(status)  
          .then(json)  
          .catch(function(error) { //срабатывает при ошибке пришедшей с сервера
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

