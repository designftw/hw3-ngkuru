import { createApp } from "https://mavue.mavo.io/mavue.js";

/**
 * Get today's date, attributed to https://stackoverflow.com/a/15301874/21022255
 * @returns today's date
 */
let getTodaysDate = () => {
	let date = new Date();

	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();

	if (month < 10) month = "0" + month;
	if (day < 10) day = "0" + day;

	let today = year + "-" + month + "-" + day;
	return today;
};

globalThis.app = createApp({
	data: {
		expenses: [],
		temporaryExpense: {
			"from": "",
			"to": "",
			"amount": "",
			"description": "",
			"currency": "USD",
			"date": getTodaysDate(),
			// "cleared": false,
		},
	},

	methods: {
		/**
		 * Currency convert function stub.
		 * In a real app, you would use an API to get the latest exchange rates,
		 * and we'd need to support all currency codes, not just EUR, USD and GBP.
		 * However, for the purposes of this assignment, this is fine.
		 * @param {"EUR" | "USD" | "GBP"} from - Currency code to convert from
		 * @param {"EUR" | "USD" | "GBP"} to - Currency code to convert to
		 * @param {number} amount - Amount to convert
		 * @returns {number} Converted amount
		 */
		currencyConvert(from, to, amount) {
			const rates = {
				USD: 1,
				EUR: 0.99,
				GBP: 0.85
			};

			return amount * rates[to] / rates[from];
		},

		addExpense() {
			if (this.temporaryExpense.from == "") {
				return;
			}
			if (this.temporaryExpense.to == "") {
				return;
			}
			if (this.temporaryExpense.amount == "" || this.temporaryExpense.amount < 0) {
				return;
			}
			if (this.temporaryExpense.from == "") {
				return;
			}
			if (!(["USD", "GBP", "EUR"].includes(this.temporaryExpense.currency))) {
				return;
			}

			let usdAmount = this.currencyConvert(this.temporaryExpense.currency, "USD", this.temporaryExpense.amount)
			let expense = {
				"from": this.temporaryExpense.from,
				"to": this.temporaryExpense.to,
				"amount": usdAmount,
				"description": this.temporaryExpense.description,
				"currency": "USD",
				"date": this.temporaryExpense.date,
				// "cleared": false,
			};

			this.expenses.unshift(expense);
			this.temporaryExpense = {
				"from": "",
				"to": "",
				"amount": "",
				"description": "",
				"currency": "USD",
				"date": getTodaysDate(),
				// "cleared": false,
			};
		},

		deleteExpense(i) {
			this.expenses.splice(i, 1);
		},

		saveExpenses() {
			expenses.sort((a, b) => {
				if (a.date <= b.date) {
					return 1;
				} else {
					return 0;
				}
			});

			expenses.save();
		}
	},

	computed: {
		total_balance() {
			let total = 0;

			for (let expense of this.expenses) {
				let debt = 0

				if (expense.from == "Trinity") {
					debt += expense.amount / 2;
				} else if (expense.from == "Neo") {
					debt -= expense.amount / 2;
				} else if (expense.from != "Joint") {
					continue;
				}

				if (expense.to == "Trinity") {
					debt -= expense.amount / 2;
				} else if (expense.to == "Neo") {
					debt += expense.amount / 2;
				} else if (expense.to != "Joint") {
					continue;
				}

				total += debt
			}

			return total;
		}
	}
}, "#app");