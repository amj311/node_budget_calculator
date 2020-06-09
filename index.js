//// Starting file for budget calculator.
const moment = require('moment');
const bstSrc = require('./BST'); 
const {BudgetTransaction} = require('./BudgetItems.js')

var item = new BudgetTransaction();
console.log(item)

var realTime_Accounts = {

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

        let minTs = this.monthSumsBST.minValue();
        let maxTs = this.monthSumsBST.maxValue();

        if (!minTs || !maxTs) return console.warn("Insufficient data to calculate period!");
        
        console.log('\n          Projected Income Over Period ' + this.monthSums[minTs].month.format('MMM YYYY') + " - " + this.monthSums[maxTs].month.format('MMM YYYY'))

        const colWidth = 10;
        var headerStr = "";
        var dividerStr = "";
        var balanceRowStr = "";
        var plotData = [];

        for (let [key, summary] of Object.entries(this.monthSums)) {
            plotData.push(summary.totalAssets)

            var headerGap = colWidth - summary.month.format('MMM').length;
            headerStr += summary.month.format('MMM');
            for (i = 0; i < headerGap; i++) headerStr += " ";

            for (i = 0; i < colWidth; i++) dividerStr += "-";
            
            var cellGap = colWidth - String(summary.totalAssets).length;
            balanceRowStr += summary.totalAssets;
            for (i = 0; i < cellGap; i++) balanceRowStr += " ";
        }

        let plotMax = Math.max.apply(null,plotData);
        let plotMin = Math.min.apply(null,plotData);
        const yInterval = 3000;
        const yMax = yInterval * Math.ceil(plotMax / yInterval)
        const yMin = yInterval * Math.floor(plotMin / yInterval)
        const yRows = (yMax-yMin) / yInterval;

        for (y = yRows; y >= 0; y--) {
            let plotRow = "";

            let rowValue = yMin + yInterval*y;
            var labelGap = colWidth - 2 - String(rowValue).length;
            for (i = 0; i < labelGap; i++) plotRow += " ";
            plotRow += rowValue + " |";

            for (data of plotData) {
                // console.log(data)
                if (data >= rowValue) plotRow += "$$$$$$    ";
                else plotRow += "          ";
            }

            console.log(plotRow)
        }

        console.log('          '+dividerStr+'\n          '+headerStr+'\n          '+balanceRowStr);
    },
};

function initCal() {
   calendar['init'] = {
       totalAssets: 2500,
   }
}

function calc1Year() {

    console.log('\nCalculating Income for period ' + moment().format('MMM YYYY') + " - " + moment().add(1, 'year').format('MMM YYYY') + '\n')
    console.log('\nMonth     Income')
    console.log('--------------------')

    for (let i = 0; i < 13; i++) {
        // console.log("\n\nCal before loop:", calendar.monthSums)
        let month = moment().add(i, 'month')

        const { found, val } = calendar.monthSumsBST.nearestLessThan(month.format('X'));
        // console.log("BST res: ", found, val)
        prevMonthSum = found ? calendar.monthSums[val] : calendar.init;
        // console.log("prevMonth: ", prevMonthSum)

        
        console.log(month.format("MMM")+"       "+1500)

        calendar.monthSumsBST.add(month.format('X'))
        calendar.monthSums[month.format('X')] = {month, totalAssets: prevMonthSum.totalAssets + 1500};
        // console.log(calendar.monthSumsBST.toString());
        // console.log(calendar.monthSums[month.format('X')]);

        // console.log("Cal at end of loop:", calendar.monthSums)

        //Slowed execution just to take a video
        for (c = 0; c < 100E6; c++) {
            let foo = c/(c-1)
        }
    }
}

initCal();

// calc1Year();

calendar.printMonths();