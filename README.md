# chain-project
```
Тестовое задание.

Что было сделано:
- маршрутизация для каждой страницы
- lazy load для каждой страницы.
- адаптация мета тегов при смене роутера.
- Изменение размеров окон и сохранение их форматов и их количества при перезагрузке страницы.
- прогресс бар при загрузке и переходах.

Логика:
Все первоначальное состояние приложения находится хранилище. Данные о количестве и первоначальном виде рабочих окон получаем в Json от сервера. Дальше в зависимости от количества окон строится интерфейс рабочего стола, соответсвенно окон на рабочем столе может быть как больше так и меньше, и они автоматически будут «строиться» сами, в зависимости от  полученных данных. Это может быть использовано также  в ролевой модели приложения, если мы хотим регулировать интерфейс для пользователя в зависимости от его роли.

Пользователь пользуется рабочим столом, информацию по окнам храним в local storage. При обновлении страницы смотрим есть ли данные в local storage, если есть - загружаем состояние, нет - делаем по дефолту. Удаление данных из local storage можно делать при logout например.
Все данные подгружаются только когда они нужны.

Открытие и закрытие сделал для каждого окна, так как предполагаю, что это будут рабочие окна и скорее всего понадобится каждое из них показывать или выключать.
Такое допущение основано на личном опыте и анализе функционалов прочих терминалов для трейдера.

Состояние закрытых и открытых окон сохраняется в том числе после перезагрузки.
При открытие окна снова, оно появляется в центре с дефолтным значением.

На странице транзакции как и по ТЗ есть три кнопки и счетчик суммы всех транзакций.
Функционал полностью по задаче. 
Каждая новая транзакция появляется первой строкой.
Данные в компоненты попадают через computed, соответсвенно мощь реактивности.
Когда транзакций нет или они сброшены исчезают заголовки таблицы.
При объеме отображаемых транзакций больше 600 px в высоту, размеры окна останавливаются и информация уходит за пределы видимости.

Прочие вводные:
Храним все переменные данные в хранилище, так как это единый источник правды. 
Получаем все данные только через геттеры.
Меню в отдельном компоненте. 
Нет смысла пока страницы разбирать на более мелкие компонены, так как пока слишком простой интерфейс.
Переменные scss в отдельном файле (цвета, шрифты ...).
Именование css классов по БЭМ.
Семантическая верстка.
Title на значениях в таблице.
Hover эффекты.
+ нужен reset.css

Сумма транзакций считается сразу при поступлении данных в хранилище, и потом просто из хранилища получаем значение. Те делаем всю работу сразу.

Из продакшена удалены все вызовы консоли.

Протестировано в браузерах Crome/Opera/Firefox/Yandex/Safari

Смотреть проект нужно на мониторе более 1000px , мобильная версия не входила в задачу.

Лично пользовался терминалами: MetaTraider 4, MetaTraider 5, Finam, QUIK

Рабочая версия доступна по ссылке: https://big-d-35.github.io/
ссылка на репозиторий с исходниками: https://github.com/big-d-35/chain-project

Будет интересно обсудить комментарии.

```
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
