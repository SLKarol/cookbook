# Кулинарная книга

Перед запуском проекта необходимо в его корневом каталоге создать файл **.env.local** и там задать следующие переменные:

- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- MONGODB_URI

Первые три это настройки подключения к [`Cloudinary`](http://cloudinary.com/), MONGODB_URI - подключение к БД MongoDB.

У Вас должно быть примерно такое содержание:

```
CLOUDINARY_CLOUD_NAME='somelogin2'
CLOUDINARY_API_KEY='2128506'
CLOUDINARY_API_SECRET='api5code'0secret'
MONGODB_URI='mongodb+srv://loginDB:passwordDB@cluster/dbName'
```

Локальный запуск: **npm run dev**.

## Скриншот

![Скриншот](https://raw.githubusercontent.com/SLKarol/cookbook/main/screenshots/1.png)

![Скриншот](https://raw.githubusercontent.com/SLKarol/cookbook/main/screenshots/2.png)
