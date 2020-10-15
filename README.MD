## Express notes
Сервер для обработки заметок.

## Сервер создан с помощью
- [express](https://expressjs.com/) - Фреймворк на базе Node.js
- [mongoose](https://mongoosejs.com/) - Обертка для базы данных mongodb

## Как запустить

Скачать и установить зависимости
```
git clone https://github.com/golushkin/express-notes.git
cd express-notes
npm i
```
Создать файл nodemon.json, написать пароль от mondodb atlas(предполагается что владелец бд 'admin') и секретный ключ
```
{
    "env":{
        "DB_PASS": "пароль",
        "SECRET_KEY": "секретный ключ"
    }
}
```
Запустить проект
```
npm start
```

## API
1. notes
    #### При отправке запросов необходимо установить заголовок Authorization. ("Authorization":"Bearer token")
    1. Получить массив из всех заметкок
        ```
       get /api/v1/notes/ => [{note},...]
       status code - 200
       ```
    1. Получить массив из всех заголовков заметок
        ```
       get /api/v1/notes/titles => [{title, _id}]
       status code - 200
       ```       
    1. Получить потомков заметки
        ```
       get /api/v1/notes/:id => [{note}]
       status code - 200
       ```  
    1. Получить заметки потомков 
        ```
       get /api/v1/notes/:id => [{note}]
       status code - 200
       ```        
    1. Сохранить заметку в бд 
        ```
       post /api/v1/notes/ => {note}       
       status code - 201
       если head - true, то parent указывать не надо и наоборот
       
       ```    
       Тело запроса
       | param | value | default |required|
       |---|----|---|--|
       |head|Boolean|false|false|
       |title|String|-|true|
       |desc|String|''|false|
       |parent|String|''|false|
       |links|Array|[]|false|
       |children|Array|[]|false|
       
       *если head - true, то parent указывать не надо и наоборот
    1. Обновить заметку в бд 
        ```
       put /api/v1/notes/:id => void
       status code - 204
       ```   
       В тело запроса входят те поля которые необходимо обновить
       ```
       Например только title
       { title: 'value' }
       ```
    1. Удалить заметку из бд 
       ```
       delete /api/v1/notes/:id => void
       status code - 204
       ```   
2. user
    #### Токен действует 1 день
    1. Зарегистрироваться
       ```
       post /api/v1/users/ => {username, token}
       status code - 201
       ```     
       Тело запроса
       | param | value | default |required|
       |---|----|---|--|
       |username|String|-|true|
       |pass|String|-|true|
   1. Авторизироваться 
       ```
       post /api/v1/users/login => {username, token}
       status code - 200
       ```     
       Тело запроса
       | param | value | default |required|
       |---|----|---|--|
       |username|String|-|true|
       |pass|String|-|true|
       

## Пример

[Demo](https://react-express-notes.herokuapp.com/home)
