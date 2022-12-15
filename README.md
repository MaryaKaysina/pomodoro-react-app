# pomodoro-react-app

**Трекер задач по методу Помодоро** 🍅

![React](https://img.shields.io/badge/-REACTJS-61DAFB?logo=react&logoColor=white&style=flat)
![TypeScript](https://img.shields.io/badge/-typescript-%23007ACC?logo=typescript&logoColor=white&style=flat)
![Redux](https://img.shields.io/badge/-redux-764ABC?logo=redux&logoColor=white&style=flat)
![Heroku](https://img.shields.io/badge/-heroku-430098?logo=Heroku&logoColor=white&style=flat)

## Функционал

<details>
<summary markdown="span"> Работа со списками задач (добавить, редактировать, удалить)</summary>
:bookmark_tabs:

Пользователь может запланировать несколько задач на свой день и для каждой
задать примерное количество «помидоров», которое необходимо, чтобы её
сделать.

Верхняя задача из списка — это текущая задача.
 </details>

<details>
 <summary markdown="span"> Работа с таймером (старт, стоп, пауза, продлить, пропустить))</summary>
:alarm_clock:

Как только пользователь готов, он запускает таймер. Если его отвлекли, то
пользователь останавливает таймер, «помидорка» при этом не засчитывается.

Пользователь может поставить таймер на паузу и пропустить «помидорку» или
перерыв.
 </details>

 <details>
<summary markdown="span"> Статистика использования таймера</summary>
:bar_chart:

На этой странице отображается статистика по использованию приложения и
некоторые полезные метрики.

Пользователь может посмотреть столбчатую диаграмму с количеством часов, когда он работал с таймером.

Может выбрать неделю, за которую он хочет посмотреть статистику.

Может посмотреть дополнительные метрики, такие как:

- Фокус (отношение времени работы с таймером ко времени, потраченному на законченные «помидорки»).

- Время на паузе.

- Остановки.
</details>

## Запуск

`npm run dev` - запуск в режиме разработки

`npm run build:prod` - сборка для продакшена

:star: **В целях демонстрации страницы со статистикой Local Storage можно заполнить моковыми данными за 3 недели, раскомментировав
`localStorage.setItem('token-pomodoro', JSON.stringify(mockTestData));` в файле App.tsx**

:star: **Открыть приложение на Vercel -> [pomodoro](https://pomodoro-box-tracker.vercel.app/)**
