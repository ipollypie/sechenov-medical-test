# Тестовое задание - одностраничный сайт с выводом таблицы

# Технологии
- Next.js
- TypeScript
- TailwindCSS
- PostgreSQL + Docker

# Функционал 
- Таблица пациентов (поля: #, ФИО, Пол, Отделение, Статус)
- Фильтрация по отделению
- Responsive design (на мобильных видно только ФИО)

# Как запустить
docker run -d --name medical-db -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin123 -e POSTGRES_DB=medical_db -p 5432:5432 postgres:15-alpine

# создать таблицу с заполненными занными 
docker exec -i medical-db psql -U admin -d medical_db < init.sql

# установить зависимости
npm install

# запустить next.js
npm run dev

# открыть в браузере
http://localhost:3000


остановка
docker stop medical-db
docker rm medical-db
