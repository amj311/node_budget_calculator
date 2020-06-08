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
    monthSums: {},
    monthSumsBST: new bstSrc.BST(),
    
    printMonths() {
        const colWidth = 10;
        var headerStr = "";
        var dividerStr = "";
        var balanceRowStr = "";

        for (let [key, summary] of Object.entries(this.monthSums)) {
            console.log(key, summary)
            var headerGap = colWidth - summary.month.format('MMM').length;
            headerStr += summary.month.format('MMM');
            for (i = 0; i < headerGap; i++) headerStr += " ";

            for (i = 0; i < colWidth; i++) dividerStr += "-";

            
            var cellGap = colWidth - String(summary.totalAssets).length;
            balanceRowStr += summary.totalAssets;
            for (i = 0; i < cellGap; i++) balanceRowStr += " ";
        }

        console.log(headerStr+'\n'+dividerStr+'\n'+balanceRowStr);
    },
};

function initCal() {
   calendar['init'] = {
       totalAssets: 2500,
   }
}

function calc1Year() {

    for (let i = 0; i < 12; i++) {
        // console.log("\n\nCal before loop:", calendar.monthSums)
        let month = moment().add(i, 'month')
        // console.log("\nComputng month: ", month.month())

        const { found, val } = calendar.monthSumsBST.lessOrEqualTo(month.format('X'));
        // console.log("BST res: ", found, val)
        prevMonthSum = found ? calendar.monthSums[val] : calendar.init;
        // console.log("prevMonth: ", prevMonthSum)

        calendar.monthSumsBST.add(month.format('X'))
        calendar.monthSums[month.format('X')] = {month, totalAssets: prevMonthSum.totalAssets + 1500};
        // console.log(calendar.monthSumsBST.toString());
        // console.log(calendar.monthSums[month.format('X')]);

        // console.log("Cal at end of loop:", calendar.monthSums)
    }
}

initCal();

calc1Year();

calendar.printMonths();