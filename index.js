#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bold.yellow("NOTE !"));
console.log(chalk.bold.yellow("I have added only 3 bank accounts, 1001, 1002, 1003"));
// Bank account class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Debit money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(chalk.bold.green(`Withdrawal of $${amount} successful, Remaining balance: $${this.balance}`));
        }
        else {
            console.log(chalk.bold.red("Insufficient balance"));
        }
    }
    // Credit money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; // $1 fee charged if more than $100 is deposited
        }
        this.balance += amount;
        console.log(chalk.bold.green(`Deposit of $${amount} successful, New balance is: $${this.balance}`));
    }
    // Check balance
    checkBalance() {
        console.log(chalk.bold.green(`Current balance: $${this.balance}`));
    }
}
// Customer class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// Create bank accounts
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000),
];
// Create customers
const customers = [
    new Customer("Abrar", "Maqsoodi", "Male", 30, 3162223334, accounts[0]),
    new Customer("Fatima", "Gul", "Female", 29, 3332223334, accounts[1]),
    new Customer("Murad", "Hasil", "Male", 29, 3412223334, accounts[2]),
];
// Function to interact with bank account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: chalk.bold.blue("Enter the account number:"),
        });
        const customer = customers.find((customer) => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(chalk.bold.yellow(`Welcome, ${chalk.bold.red(customer.firstName)} ${chalk.bold.red(customer.lastName)}!\n`));
            const ans = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: chalk.bold.blue("Select an operation"),
                    choices: ["Desposit", "Withdraw", "Check Balance", "Exit"],
                },
            ]);
            switch (ans.select) {
                case "Desposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: chalk.bold.blue("Enter amount to deposit:"),
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: chalk.bold.blue("Enter amount to withdraw:"),
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log(chalk.bold.red("Exiting Banking Program"));
                    console.log(chalk.bold.yellow("\nThank you for banking with us!"));
                    return;
            }
        }
        else {
            console.log(chalk.bold.red("Invalid account number. Please try again."));
        }
    } while (true);
}
service();
