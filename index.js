const colors = require('colors');

function getPrimeNumbers() {
    let bottomNumber = +process.argv[2];
    let topNumber = +process.argv[3];
    if (process.argv[2] > process.argv[3]) {
        topNumber = +process.argv[2];
        bottomNumber = +process.argv[3];
    }
    if (isNaN(bottomNumber + topNumber)) {
        return console.log('Введите числа');
    }
    let primeNumbersArray = [];
    outer: for (let i = bottomNumber; i <= topNumber; i++) {
        for (let j = 2; j < i; j++) {
            if (i % j == 0) continue outer;
        }
        primeNumbersArray.push(i);
    }
    if (primeNumbersArray.length == 0) console.log(colors.red('Простых чисел в диапазоне нет'));
    primeNumbersArray.forEach(number => {
        let remainder = (primeNumbersArray.indexOf(number) % 3)
        switch (remainder) {
            case 0:
                console.log(colors.red(number));
                break;
            case 1:
                console.log(colors.yellow(number));
                break;
            case 2:
                console.log(colors.green(number));
                break;
        }
    });
}
getPrimeNumbers();

