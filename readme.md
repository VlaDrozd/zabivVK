### Как пользоваться
1. npm install.
2. Заходим в config/default.json.
3. Вводим поля username - vk имя пользователя, password - пароль от vk.
4. Заходим в нужный диалог (беседу вк, !!!НЕ ЛС!!!) и из адреса копируем цифры в конце. Затем вставляем в conversationID поле.
5. message - сообщение, которое хотим отправить.
6. time - вводим время отправки в формате как там.
7. node app.js
8. Если авторизация происходит в первый раз и у вас есть двухфакторная аунтификация, то нужно ввести в косоль код подтверждения.
9. После первой авторизации появится файл сессии. username и password из config можно удалить тк теперь аворизация будет автоматической. (Если удалить файл, то прийдется все делать заново).
