# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.1.1](https://github.com/anclaev/svadba/compare/v1.1.0...v1.1.1) (2025-05-04)

### Добавлено

- **web:** разметка OpenGraph. ([308de72](https://github.com/anclaev/svadba/commit/308de72456a816468817ace55e568d683906609e))

### Исправлено

- **deployment:** кэш web в volume. ([2a63ff5](https://github.com/anclaev/svadba/commit/2a63ff501e730e94c1f2198f441ef308e4511a78))

## [1.1.0](https://github.com/anclaev/svadba/compare/v1.0.1...v1.1.0) (2025-05-04)

### Исправлено

- **api:** версионирование credentials у пользователя. [#83](https://github.com/anclaev/svadba/issues/83) ([02c4518](https://github.com/anclaev/svadba/commit/02c4518f6cef3f81438c4aeb932257137a1a783b))
- **api:** хеширование пароля пользователя при изменении. [#82](https://github.com/anclaev/svadba/issues/82) ([bf1c408](https://github.com/anclaev/svadba/commit/bf1c408845ae638512ff782a734c4af2c82580d6))
- **web:** эндпойнт гостей. ([4f4244b](https://github.com/anclaev/svadba/commit/4f4244b4b70aeec68e8897d43d1a81fb9f5bf346))

### Добавлено

- **api:** получение пользователя. [#9](https://github.com/anclaev/svadba/issues/9) ([2518870](https://github.com/anclaev/svadba/commit/2518870730cc89daec69fb9f0fc341aa029672dd))
- **api:** получение списка гостей. ([e5175f1](https://github.com/anclaev/svadba/commit/e5175f184be116fd9fe52c9ff07c6103feb0e31a))
- **api:** регистрация гостя. ([a2f43a3](https://github.com/anclaev/svadba/commit/a2f43a3da19fb4da89227bb321c9e47dea34a55e))
- **api:** эндпойнты CRUD пользователя. [#12](https://github.com/anclaev/svadba/issues/12) ([b8125e3](https://github.com/anclaev/svadba/commit/b8125e3b8cd2bf62e6dcd9919dde1fda8efe40b7))
- **config:** опциональное разрешение регистрации. ([ff1d159](https://github.com/anclaev/svadba/commit/ff1d1593bea69872d8df581b56a276cbb827cbd6))
- **web:** подготовка списка гостей. ([6c6fe21](https://github.com/anclaev/svadba/commit/6c6fe212a6084aaedded2d2b6ae3193d67f18b84))
- **web:** sentry в разработке. [#86](https://github.com/anclaev/svadba/issues/86) ([0815152](https://github.com/anclaev/svadba/commit/08151526c483c03d6032dcc0ab2c4265c52390d6))

### [1.0.1](https://github.com/anclaev/svadba/compare/v1.0.0...v1.0.1) (2025-05-03)

### Исправлено

- **deployment:** версия приложения при сборке в прод. [skip ci] ([2959c03](https://github.com/anclaev/svadba/commit/2959c03857b171180418e8dbac9d9ce199106220))

## 1.0.0 (2025-05-03)

### Добавлено

- **api:** [#17](https://github.com/anclaev/svadba/issues/17) команда создания гостя. ([b970402](https://github.com/anclaev/svadba/commit/b9704027272ddce6e54637daa790d757e381333e))
- **api:** запрос получения гостя по id. ([7ccdaf3](https://github.com/anclaev/svadba/commit/7ccdaf3864e019e83734af82d6393c16586faf67))
- **api:** запрос получения гостя по userId. ([fa02b46](https://github.com/anclaev/svadba/commit/fa02b46471338c4688b59d0734e8873359c8b926))
- **api:** настройки CORS. ([68d5172](https://github.com/anclaev/svadba/commit/68d5172d9f4ec499a4ce5f5ff04a26371ce8002b))
- **api:** работа с регистрационными ссылками. ([2ac8064](https://github.com/anclaev/svadba/commit/2ac8064e7c0cb8e0872443adf38c79347e84e036))
- **api:** репозиторий регистрационной ссылки. ([ed76776](https://github.com/anclaev/svadba/commit/ed7677623ce72920b6c2b5f4e83634cec4ac573d))
- **api:** сущность регистрационной ссылки. ([8c8942a](https://github.com/anclaev/svadba/commit/8c8942a5afaaa90724826610faf3ed9909922634))
- **api:** updatedAt в модели. ([72756a0](https://github.com/anclaev/svadba/commit/72756a0bbf461d43a6b263a612e675e999e9d5e2))
- **bot:** \* Добавлена логика регистрации пользователя. ([f5018a8](https://github.com/anclaev/svadba/commit/f5018a88f78310904042d99e7932ad3cce4d535c))
- **bot:** авторизация по bearer-токену. ([50df167](https://github.com/anclaev/svadba/commit/50df1672ede38d0c67be982c570bcad682057c21))
- **bot:** базовые настройки бота. ([706a825](https://github.com/anclaev/svadba/commit/706a825964938f3106076008538c39593ebc627d))
- **bot:** интеграция Swagger. ([d0d4239](https://github.com/anclaev/svadba/commit/d0d42395bf651da3b752a91367857522d8bd8eef))
- **bot:** модуль подключения к S3-хранилищу. ([28ed2ff](https://github.com/anclaev/svadba/commit/28ed2ffc1f1adb5b5307c36793b7edd9ff58ae69))
- **bot:** переезд на nestjs. ([11c64af](https://github.com/anclaev/svadba/commit/11c64af7207a984f4d7cd8d3854ad0dd257b96f8))
- **bot:** подготовка DDD. ([906342f](https://github.com/anclaev/svadba/commit/906342fce6db1e6aca5db5856cb357d835db8058))
- **bot:** работа над загрузкой файла. ([52a0bb8](https://github.com/anclaev/svadba/commit/52a0bb8d5f3508d39008a3a1402f7a9f1dd75ff1))
- **bot:** работа над социальными ссылками в боте. ([0c9af9c](https://github.com/anclaev/svadba/commit/0c9af9c4e043e42860ccad46afb7f379d0a73404))
- **bot:** функционал социальных ссылок. ([45772e7](https://github.com/anclaev/svadba/commit/45772e7d80a3df03238e7d15939d14d61ac75db7))
- **bot:** эндпойнт создания пользователя. ([1d23931](https://github.com/anclaev/svadba/commit/1d2393105ac9461c8087abca58a3009b618fab73))
- **bot:** auth grant type. ([7b2b4df](https://github.com/anclaev/svadba/commit/7b2b4df69b4dd509a8d15a7dcc47204d68beb239))
- **bot:** more. ([d7ed43b](https://github.com/anclaev/svadba/commit/d7ed43b622ef4e011f9f798d3e56fd7b072e05f2))
- **common:** shared модуль в @repo/shared. ([99d2805](https://github.com/anclaev/svadba/commit/99d28051cdd785e2fcb856f1d8ae39bfd83927c5))
- **config:** обновление scopes коммитов. [skip ci] ([55f8c38](https://github.com/anclaev/svadba/commit/55f8c385b30bfd0480748fad1f8a83e44dea6bae))
- **config:** sentry dsn и настройки gRPC. ([4a6a697](https://github.com/anclaev/svadba/commit/4a6a697cb2f2aa25fd3ac4aec0a2133aa46d216b))
- **core:** изменения в инфраструктуре. ([e7a7273](https://github.com/anclaev/svadba/commit/e7a7273850e717643116faef3fb220074dccdcd6))
- **core:** коллективные улучшения. ([34a7fbe](https://github.com/anclaev/svadba/commit/34a7fbec9ce8805d7127305cfa5b56b7b06caedc))
- **core:** кэш клиента на сервере. ([4e308d9](https://github.com/anclaev/svadba/commit/4e308d92bacbce5b4d649e2c2ee45dac1205252b))
- **core:** ssl. ([9612016](https://github.com/anclaev/svadba/commit/961201601736b92b0858614a72934801dba85535))
- **db:** инициализация базы данных. ([8c47bab](https://github.com/anclaev/svadba/commit/8c47babfadceebda1d1fffa4d6b1c7a70f4426d2))
- **db:** модель гостя. ([074de92](https://github.com/anclaev/svadba/commit/074de92f4cb58b022bf35e2e50b3bb8aae5e7447))
- **db:** модель ссылок для регистрации. ([6669ff3](https://github.com/anclaev/svadba/commit/6669ff3ae4202532eb5a20491a210c26a1faaeea))
- **db:** расширение модели данных. ([6d3a32f](https://github.com/anclaev/svadba/commit/6d3a32fadf7631bf4d809282a623d27a08f9075d))
- **deployment:** интеграция allowed origins. ([b48a4a2](https://github.com/anclaev/svadba/commit/b48a4a22df968765a856f4e2539dbdc4f64e3943))
- **web:** базовые стили. ([b51dbb4](https://github.com/anclaev/svadba/commit/b51dbb4a4bd357948279e33f2625b0d6dc106eb3))
- **web:** вёрстка главной страницы. ([a763c81](https://github.com/anclaev/svadba/commit/a763c81e6340f5f335dcc1f59c55091595be393f))
- **web:** вёрстка формы регистрации. ([f278edc](https://github.com/anclaev/svadba/commit/f278edcee52aa260b8a074dbc28bb1d59966177f))
- **web:** доработка авторизации. ([180342e](https://github.com/anclaev/svadba/commit/180342ec4b31d41d842f3ebe4a42d25047ffb81f))
- **web:** интеграция анимаций на главную страницу. ([0d92f5a](https://github.com/anclaev/svadba/commit/0d92f5ae821dbe0f92636b9eaacfb29966e05354))
- **web:** интеграция fsd. ([29f3741](https://github.com/anclaev/svadba/commit/29f3741c9af46b9fdcd94558fb9b3536b3cdbfc8))
- **web:** интеграция sentry. ([b96728a](https://github.com/anclaev/svadba/commit/b96728ad90f2dbbd98883b9711238994e934829c))
- **web:** интерфейс регистрационных ссылок. ([e20ee3a](https://github.com/anclaev/svadba/commit/e20ee3a0cdab220c0bcdfcc7e008715ae6e3d48b))
- **web:** комплексные улучшения. ([fb306e7](https://github.com/anclaev/svadba/commit/fb306e7d38a3b9a399bc4a1ba0fcb6295ec1e956))
- **web:** компонент лого. ([d22ccd0](https://github.com/anclaev/svadba/commit/d22ccd0792a90bc957ca4bd2a3b7e828c2c94afe))
- **web:** логика выхода из системы. ([16de13e](https://github.com/anclaev/svadba/commit/16de13e1790981e5598e154c63ccbd4affaa1104))
- **web:** настройка переменных окружения. ([91843b5](https://github.com/anclaev/svadba/commit/91843b5764e470cdbd86fae8444adae032168e1f))
- **web:** отображение социальных ссылок. ([5279358](https://github.com/anclaev/svadba/commit/52793587de6e377d3f486173015474359027c5a5))
- **web:** подготовка панели гостя. ([dbe5e95](https://github.com/anclaev/svadba/commit/dbe5e95f2875d1d4aa4b09f7832a01b79b66f5f2))
- **web:** проверка статуса пользователя. ([c76a5d2](https://github.com/anclaev/svadba/commit/c76a5d2c6b816909c642dde3a45c177ad3646c2d))
- **web:** секция дресс-кода. ([5f1d7e1](https://github.com/anclaev/svadba/commit/5f1d7e1280476a45dc7391a980c9b1536651ae89))
- **web:** секция места проведения. ([80f17be](https://github.com/anclaev/svadba/commit/80f17be0c901143abe7e3df6037e260a57de50cd))
- **web:** секция плана дня. ([d3494f5](https://github.com/anclaev/svadba/commit/d3494f5551ed4ca7cbe39209881709a7a759f60d))
- **web:** секция промо. ([1742d7f](https://github.com/anclaev/svadba/commit/1742d7f51d4e652f8ff8a236c1b47b8f8fe01fe7))
- **web:** форма входа. ([6f5a805](https://github.com/anclaev/svadba/commit/6f5a80506bede1ba1a09d274d8c49170299e68d4))
- **web:** хук usePagination. ([2dc9787](https://github.com/anclaev/svadba/commit/2dc97876dd6b8b6b46ef757a79afcd184a6af15c))
- **web:** sign in. ([c697eb9](https://github.com/anclaev/svadba/commit/c697eb9336eaa86ce1fd9ee74e2cb298e94e8682))

### Исправлено

- **api:** обновление версии nodejs. [skip ci] ([08d2f07](https://github.com/anclaev/svadba/commit/08d2f07adc2ec31d6f53502bd72829c4a4d53474))
- **bot:** валидация порта S3-хранилища. ([67cc3b6](https://github.com/anclaev/svadba/commit/67cc3b632d4362649f4390c8785e011bbd701851))
- **bot:** настройки логгера. ([5d5936e](https://github.com/anclaev/svadba/commit/5d5936e39cab154909981fada5ca7fe51f6459e9))
- **bot:** dockerfile. ([d01a741](https://github.com/anclaev/svadba/commit/d01a7418125d2a38ae42d3b7897078d3077ef619))
- **bot:** minio ssl. ([ffa44a0](https://github.com/anclaev/svadba/commit/ffa44a079569aa185d5fcb6aaba5d5cd58dcbb41))
- **bot:** package.json. ([cd88fb6](https://github.com/anclaev/svadba/commit/cd88fb6331a2effc81b6e4514dff8f38e4a16b40))
- **bot:** ssl. ([4a0401e](https://github.com/anclaev/svadba/commit/4a0401e6510e21f666e9144cccd7237cb4fab895))
- **common:** доработка tsconfig. ([087a9d3](https://github.com/anclaev/svadba/commit/087a9d39039d254a36d937def7089b85782b0033))
- **common:** модель авторизованного пользователя и социальные ссылки. ([25fcc55](https://github.com/anclaev/svadba/commit/25fcc557d06b5fb582557f310d9197cab29a6ede))
- **common:** husky. ([ca4d77f](https://github.com/anclaev/svadba/commit/ca4d77fdf1b1158ee7e4027c5d08a5bf5e355e5a))
- **common:** lint staged. ([11e90a6](https://github.com/anclaev/svadba/commit/11e90a61b7b7172b315c565747b4a1c2c003c021))
- **common:** lint staged. ([4d6716f](https://github.com/anclaev/svadba/commit/4d6716f09ffd422344a5a6ee9cb066cf71b570aa))
- **core:** команда запуска unit-тестов. ([0838b64](https://github.com/anclaev/svadba/commit/0838b644145b0cd1149d4fc89d54d3516a676c6a))
- **core:** окружения sentry. ([62da2aa](https://github.com/anclaev/svadba/commit/62da2aa496454d3833a1e50690a74e36ef58ed56))
- **core:** ci. ([550e889](https://github.com/anclaev/svadba/commit/550e889c2fca096d90e626d1cd126c65cf991c3c))
- **core:** ci. ([7b71c79](https://github.com/anclaev/svadba/commit/7b71c795081a5f7ab249baa29be536218093d93f))
- **core:** ci. ([4451823](https://github.com/anclaev/svadba/commit/4451823a291f965032d6d42cf10bfcf17e790306))
- **core:** ci. ([cad0c64](https://github.com/anclaev/svadba/commit/cad0c6449e72162af4e0804b2e1e988fb040354e))
- **core:** ci. ([ea8dee1](https://github.com/anclaev/svadba/commit/ea8dee1d435223eb7c75322b56473e290db7a43c))
- **core:** ci. ([a65148c](https://github.com/anclaev/svadba/commit/a65148c80bcae9369346ccd96614d2688fe30ebe))
- **core:** ci. ([70beac2](https://github.com/anclaev/svadba/commit/70beac29e68f0a2f75625858989731b347588f52))
- **core:** package.json. ([b002975](https://github.com/anclaev/svadba/commit/b002975e5e706ad803047b9c7a1f36d8e6cade8d))
- **core:** package.json. ([8116bab](https://github.com/anclaev/svadba/commit/8116bab6c919f9efeabec54dbabc3712c97065e0))
- **deployment:** доработка e2e-тестов. ([647cf9d](https://github.com/anclaev/svadba/commit/647cf9df2373b565a281b269e19ae2e3eadd12df))
- **docker:** сборка бота. ([bee72eb](https://github.com/anclaev/svadba/commit/bee72eb66b061d636936cf514ba6291180456b87))
- **web:** горизонтальная прокрутка на мобильных. ([51d058a](https://github.com/anclaev/svadba/commit/51d058a764f65500923f93a2c29dbc3a9dae6a03))
- **web:** доработка проверки статуса пользователя. ([49be4c0](https://github.com/anclaev/svadba/commit/49be4c0d5450415706173f72249353d4a2dd3316))
- **web:** оптимизация анимаций. ([75d144c](https://github.com/anclaev/svadba/commit/75d144cf6cd066ee9ae200f197fa40dead9dd868))
- **web:** удаление интеграции cloudflare. ([07a159b](https://github.com/anclaev/svadba/commit/07a159bab94a6ce16772191c9a1bf5d1a16348ca))
- **web:** env. ([61f8f85](https://github.com/anclaev/svadba/commit/61f8f854ee7e45a4f439139ff1c9919ccaecfd59))
- **web:** path aliases. ([9758881](https://github.com/anclaev/svadba/commit/97588819a82d6a772a74eeb3a6ba0cf57c327f6a))
