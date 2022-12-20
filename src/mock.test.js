import { getWeek } from "./utils/js/getWeek";
import {
  DEFAULT_FREQUENCY_LONG_BREAK,
  DEFAULT_TIME,
  DEFAULT_TIME_BREAK,
  DEFAULT_TIME_BREAK_LONG,
  IS_ACTIVE
} from "./utils/conts";

function randomBool() {
  return !Math.round(Math.random());
}

function randomInteger(min = 0, max = 1000) {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

export function mockData() {
  const auth = 'mail@mail.mail';
  const logInDate = Date.now();
  const tasks = [];
  const pauseTime = [];

  const week = getWeek(0).slice(0, 5)
    .concat(getWeek(1).slice(0, 5).concat(getWeek(2).slice(0, 5)));

  let id = 0;

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < week.length; j++) {
      const data = {};
      data.id = id;
      data.text = `Тестовая задача №${id + 1}`;
      data.time = 1500;
      data.currentTime = randomInteger(0, 2000);
      data.createdAt = Date.parse(week[0]);
      data.updateddAt = Date.parse(week[j]);
      data.done = true;
      data.skip = randomBool();
      id = id + 1;
      tasks.push(data);
    }
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < week.length; j++) {
      const data = {};
      data.createdAt = week[j];
      data.time = randomInteger();
      pauseTime.push(data);
    }
  }

  return [{
    auth: auth,
    logInDate: logInDate,
    tasks: tasks,
    pauseTime: pauseTime,
    isDark: false,
    settings: {
      timePomodoro: DEFAULT_TIME,
      timeShortBreak: DEFAULT_TIME_BREAK,
      timeLongBreak: DEFAULT_TIME_BREAK_LONG,
      frequencyLongBreak: DEFAULT_FREQUENCY_LONG_BREAK,
      isActivePush: IS_ACTIVE,
    }
  }];
}
