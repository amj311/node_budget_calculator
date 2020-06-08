//// Starting file for budget calculator.
const moment = require('moment');
const bstSrc = require('./BST'); 

console.log('hello world.')

var accounts = {

    26739094: {
        type: 'checking',
        balance: 200
    },
    26739095: {
        type: 'savings',
        balance: 2500
    },
    12345678: {
        type: 'checking',
        balance: 1400
    }
}

var planned_incomes = [
    {
        name: "",
        taxed: false,
        qty: 1500,
        schedule: {
            recurring: true,
            init: Date.now(),
            end: null,
            interval: '',
        }
    }
]

var goals = {

}


var calendar = {
    init: {},
    events: {},
    eventsBST: new bstSrc.BST(),
};

function initCal() {
   calendar['init'] = {
       totalAssets: 2500,
   }
}

function calc1Year() {

    for (let i = 0; i < 12; i++) {
        let month = moment().add(i, 'month')
        console.log(month)
        let prevMonth = calendar[month-1] ||  calendar.init;
        console.log(prevMonth)

        calendar.events[month.format('X')] = {month};
    }


    for (const [ts, state] of Object.entries(calendar.events)) {
        console.log(ts, state);
    }
}

initCal();

// calc1Year();

calendar.eventsBST.add(16);
calendar.eventsBST.add(15);
calendar.eventsBST.add(14);
calendar.eventsBST.add(13);
console.log(calendar.eventsBST.toString())
console.log(calendar.eventsBST.contains(5))
console.log(calendar.eventsBST.lessOrEqualTo(10).found)