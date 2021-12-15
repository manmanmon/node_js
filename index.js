const colors = require("colors/safe");
const { DateTime } = require("luxon");
const EventEmitter = require('events');

// Для запуска таймера введите команду 'npm run start 2022 12 25 23 45', где 2022 - год, 12 - месяц, 25 - день, 23 - час, 45 - минута (дата, время могут быть любыми)

// Привожу введенные значения к числам 
let parseIntMass = process.argv.map(function (item) {
    let number = parseInt(item);
    return isNaN(number) ? item : number;
});

const [, , myYear, myMonth, myDay, mayHour, myMinute] = parseIntMass;

let currentDate = DateTime.now();

myDate = DateTime.fromObject({
    year: myYear,
    month: myMonth,
    day: myDay,
    hour: mayHour,
    minute: myMinute,
    second: 0,
    millisecond: currentDate.millisecond,
});

let diffDate = myDate.diff(currentDate, ['year', 'months', 'days', 'hours', 'minutes', 'seconds']).toObject();

let {
    years: yearsTmr,
    months: monthsTmr,
    days: daysTmr,
    hours: hoursTmr,
    minutes: minutesTmr,
    seconds: secondsTmr,
} = diffDate;

// Создаю класс-наследник EventEmmitter и его экземпляра 
class MyEmitter extends EventEmitter { };
const emitterTimerConsole = new MyEmitter();

// Функция таймера
function setTimer() {

    // Создаю класс для обработки событий в зависимости от их типа
    class ConsoleLogMessage {
        static showRemainingTime(params) {
            console.log(params);
        }
        static sayTimeOut() {
            console.log(colors.green('Время вышло!'));
        }
    }

    // Создаю обработчики событий
    emitterTimerConsole.on('showRemainingTime', ConsoleLogMessage.showRemainingTime);
    emitterTimerConsole.on('sayTimeOut', ConsoleLogMessage.sayTimeOut);
    emitterTimerConsole.setMaxListeners(0);

    let timer = setInterval(() => {
        let timeForShow = `${yearsTmr} лет, ${monthsTmr} месяцев, ${daysTmr} дней, ${hoursTmr} часов, ${minutesTmr} минут, ${secondsTmr} секунд`;

        if (yearsTmr == 0 && monthsTmr == 0 && daysTmr == 0 && hoursTmr == 0 && minutesTmr == 0 && secondsTmr == 0) {
            emitterTimerConsole.emit('sayTimeOut');
            // console.log('Время вышло');
            clearInterval(timer);
        }
        if (secondsTmr == 0) {
            if (minutesTmr > 0) {
                --minutesTmr;
                secondsTmr = '59';
                emitterTimerConsole.emit('showRemainingTime', timeForShow);
                // console.log(timeForShow);
            } else if (minutesTmr == 0 && hoursTmr > 0) {
                --hoursTmr;
                minutesTmr = '59';
                secondsTmr = '59';
                emitterTimerConsole.emit('showRemainingTime', timeForShow);
                // console.log(timeForShow);
            } else if (minutesTmr == 0 && hoursTmr == 0 && daysTmr > 0) {
                --daysTmr;
                hoursTmr = '23';
                minutesTmr = '59';
                secondsTmr = '59';
                emitterTimerConsole.emit('showRemainingTime', timeForShow);
                // console.log(timeForShow);
            } else if (minutesTmr == 0 && hoursTmr == 0 && daysTmr == 0 && monthsTmr > 0) {
                --monthsTmr;
                daysTmr = '30';
                hoursTmr = '23';
                minutesTmr = '59';
                secondsTmr = '59';
                emitterTimerConsole.emit('showRemainingTime', timeForShow);
                // console.log(timeForShow);
            } else if (minutesTmr == 0 && hoursTmr == 0 && daysTmr == 0 && monthsTmr == 0 && yearsTmr > 0) {
                --yearsTmr;
                monthsTmr = '12';
                daysTmr = '30';
                hoursTmr = '23';
                minutesTmr = '59';
                secondsTmr = '59';
                emitterTimerConsole.emit('showRemainingTime', timeForShow);
                // console.log(timeForShow);
            }
        } else {
            --secondsTmr;
            emitterTimerConsole.emit('showRemainingTime', timeForShow);
            // console.log(timeForShow);
        }
    }, 100);
};

setTimer();