<h2>1. Налаштування змінних оточення:</h2>

-   У корені проєкту створити файл .env
-   Додати до нього такі змінні:
-   Реалізувати використання цих змінних у конфігурації Axios

<img src="screenshots/8.png">

<img src="screenshots/9.png">

<h2>2. Створити конфігурацію Axios:</h2>

-   Створити окремий файл (наприклад, src/api/axios.ts)
-   Налаштувати базовий baseURL, заголовок Content-Type, токен авторизації:
-   Реалізувати обробку помилок через інтерцептор (наприклад, логування у консоль або показ повідомлення)

<img src="screenshots/9.png">

<img src="screenshots/10.png">

<h2>3. Замінити мок-функції на реальні HTTP-запити:</h2>

У файлі з API-функціями (src/api/posts.ts або аналогічному) замінити реалізацію:
-   getAllEntities() → GET /posts
-   getEntityById(id) → GET /posts/:id
-   createEntity(data) → POST /posts
-   updateEntity(id, data) → PUT /posts/:id
-   deleteEntity(id) → DELETE /posts/:id

    Повернення типізованих відповідей із Axios бажане

<img src="screenshots/11.png">

<h2>4. [Опціонально, для підвищення оцінки] Реалізувати UI для логіну:</h2>

Створити окрему сторінку логіну (/login)
-   Додати форму з полями email та password
-   При сабміті відправляти POST /auth/login, отримувати JWT
-   Зберігати токен у localStorage або sessionStorage
-   Налаштувати Axios для використання збереженого токена
-   Після успішного логіну — редирект на /posts

    У базовому варіанті допускається використання токена зі змінної оточення без UI логіну.

<img src="screenshots/12.png">

<img src="screenshots/13.png">

<img src="screenshots/14.png">

<img src="screenshots/10.png">

<img src="screenshots/15.png">