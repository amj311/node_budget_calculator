class BudgetTransaction  {
    constructor () {
        this.name = "Unnamed";
        this.taxed = false;
        this.wgt = 0;
        this.schedule = {
            recurring: true,
            init: Date.now(),
            end: null,
            interval: '',
        }

        console.log("Made a new BudgetItem: "+this.name)
    }
}

module.exports = {BudgetTransaction};