const { DateTime } = require("luxon");

let parseIntMass = process.argv.map(function (item, index, arr) {
    let number = parseInt(item);
    return isNaN(number) ? item : number;
});

const [, ,
    myYear,
    myMonth,
    myDay,
    mayHour,
    myMinute,
] = parseIntMass;

let myDate = DateTime.fromObject({
    year: myYear,
    month: myMonth,
    day: myDay,
    hour: mayHour,
    minute: myMinute,
    second: 0,
});

let currentDate = DateTime.now();
let diffDate = myDate.diff(currentDate, ['year', 'months', 'days', 'hours', 'minutes', 'seconds']).toObject();

let {
    years: yearsTmr,
    months: monthsTmr,
    days: daysTmr,
    hours: hoursTmr,
    minutes: minutesTmr,
    seconds: secondsTmr,
} = diffDate;


function setTimer() {

    let timer = setInterval(() => {
        let timeForShow = `${yearsTmr} лет, ${monthsTmr} месяцев, ${daysTmr} дней, ${hoursTmr} часов, ${minutesTmr} минут, ${secondsTmr} секунд`;

        if (yearsTmr == 0 && monthsTmr == 0 && daysTmr == 0 && hoursTmr == 0 && minutesTmr == 0 && secondsTmr < 0) {
            console.log('Время вышло');
            clearInterval(timer);
        }
        if (secondsTmr < 0) {
            if (minutesTmr > 0) {
                --minutesTmr;
                secondsTmr = '59';
                console.log(timeForShow);
            } else if (minutesTmr == 0 && hoursTmr > 0) {
                --hoursTmr;
                minutesTmr = '59';
                secondsTmr = '59';
                console.log(timeForShow);
            } else if (minutesTmr == 0 && hoursTmr == 0 && daysTmr > 0) {
                --daysTmr;
                hoursTmr = '23';
                minutesTmr = '59';
                secondsTmr = '59';
                console.log(timeForShow);
            } else if (minutesTmr == 0 && hoursTmr == 0 && daysTmr == 0 && monthsTmr > 0) {
                --monthsTmr;
                daysTmr = '30';
                hoursTmr = '23';
                minutesTmr = '59';
                secondsTmr = '59';
                console.log(timeForShow);
            } else if (minutesTmr == 0 && hoursTmr == 0 && daysTmr == 0 && monthsTmr == 0 && yearsTmr > 0) {
                --yearsTmr;
                monthsTmr = '12';
                daysTmr = '30';
                hoursTmr = '23';
                minutesTmr = '59';
                secondsTmr = '59';
                console.log(timeForShow);
            }

        } else {
            --secondsTmr;
            console.log(timeForShow);
        }
    }, 1);
};

setTimer();