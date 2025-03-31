# API

## Параметры

1. $limit - количество элементов
2. $offset - начальная позиция выборки
3. $sort - параметры сортировки
4. $filter - параметры фильтрации

## Auth

1. [x] GET /auth/profile - получение информации об авторизованном пользователе
2. [x] POST /auth/sign-up - регистрация пользователя
3. [x] POST /auth/login - авторизация пользователя
4. [x] POST /auth/refresh - обновление авторизации
5. [x] POST /auth/logout - выход из системы

## Guest

1. [ ] GET /guests - получение списка гостей
2. [ ] POST /guests - создание гостя
3. [ ] DELETE /guests - удаление гостя по id
4. [ ] GET /guests/{id} - получение гостя по id
5. [ ] PUT /guests/{id} - изменение гостя по id
6. [ ] DELETE /guests/{id} - удаление гостя по id
7. [ ] GET /guests/{id}/answers - получение ответов гостя по ids
8. [ ] GET /guests/{id}/uploads - получение загрузок гостя по id
9. [ ] GET /guests/{id}/achievements - получение достижений гостя по id
10. [ ] GET /guests/{id}/quests - получение квестов гостя по id
11. [ ] GET /guests/{id}/transactions - получение транзацкий гостя по id

## Quest

1. [ ] GET /quests - получение списка квестов
2. [ ] POST /quests - создание квеста
3. [ ] DELETE /quests - удаление квеста по id
4. [ ] GET /quests/{id} - получение квеста по id
5. [ ] PUT /quests/{id} - изменение квеста по id

## Transaction

1. [ ] GET /transactions - получение списка транзакций
2. [ ] POST /transactions - создание транзакции
3. [ ] DELETE /transactions - удаление транзакции по id
4. [ ] GET /transactions/{id} - получение транзакции по id
5. [ ] PUT /transactions/{id} - изменение транзакции по id

## Achievement

1. [ ] GET /achievements - получение списка ачивок
2. [ ] POST /achievements - создание ачивки
3. [ ] DELETE /achievements - удаление ачивки по id
4. [ ] GET /achievements/{id} - получение ачивки по id
5. [ ] PUT /achievements/{id} - изменение ачивки по id

## Upload

1. [ ] GET /uploads - получение списка загрузок
2. [ ] POST /uploads - создание загрузки
3. [ ] DELETE /uploads - удаление загрузки по id
4. [ ] GET /uploads/{id} - получение загрузки по id
5. [ ] PUT /uploads/{id} - изменение загрузки по id
6. [ ] DELETE /uploads/{id} - удаление загрузки по id

## Event

1. [ ] GET /events - получение списка мероприятий
2. [ ] POST /events - создание мероприятия
3. [ ] DELETE /events - удаление мероприятия по id
4. [ ] GET /events/{id} - получение мероприятия по id
5. [ ] PUT /events/{id} - изменение мероприятия по id
6. [ ] DELETE /events/{id} - удаление мероприятия по id

## Dresscode

1. [ ] GET /dresscode-colors - получение списка цветов
2. [ ] POST /dresscode-colors - создание цвета
3. [ ] DELETE /dresscode-colors - удаление цвета по id
4. [ ] GET /dresscode-colors/{id} - получение цвета по id
5. [ ] PUT /dresscode-colors/{id} - изменение цвета по id
6. [ ] DELETE /dresscode-colors/{id} - удаление цвета по id
