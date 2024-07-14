import inquirer from "inquirer"
import chalk from "chalk";
// Bank Account Interface
interface BankAccount{
    accountNumber: number;
    balance:number;
    withdraw(amount:number): void
    deposit(amount:number): void
    checkBalance(): void
}

// Bank Account Class
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber:number,balance:number){
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

//Debit money
withdraw(amount: number): void {
    if(this.balance >= amount){
        this.balance -= amount;
        console.log(chalk.yellow(`Withdrawl of ${amount} successfully. Remaining balance is ${this.balance}`));
    } else{
        console.log(chalk.greenBright("Insufficiant balance."));
    }
}   


// Credit money
deposit(amount: number): void {
    this.balance += amount;
    console.log(chalk.yellow(` Deposite of ${amount} successfully. Remaining balance is ${this.balance}.`));
}

// Check balance
checkBalance(): void {
    console.log(chalk.greenBright(`Current balance ${this.balance}`));
}

}

// Customer class
class Customer{
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName: string,lastName: string,gender: string,age: number,mobileNumber: number,account: BankAccount){
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }

}

// Create bank account

const accounts: BankAccount[] = [
    new BankAccount (1001,500),
    new BankAccount (1002,1000),
    new BankAccount (1003,2000)
];

// Create customer

const customers: Customer[] = [
    new Customer ("Syeda" , "Alina" , "Female" , 30 , 11233456668 , accounts[0]),
    new Customer ("Khalid" , "Khan" , "Male" , 25 , 22364378334 , accounts[1]),
    new Customer ("Syeda" , "Hafsa" , "Female" , 30 , 11233456668 , accounts[2])
]

// Function to interact with bank account

async function service() {

  do {
          const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type:"number",
            message:"Enter your account number:"
        });
    
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
        
        if(customer){
        console.log(chalk.magentaBright(`Welcome, ${customer.firstName} ${customer.lastName}!\n`));
         
        const ans = await inquirer.prompt([{
            name:"select",
            type:"list",
            message: "Select an operator",
            choices:["Deposit" , "Withdraw" , "Check Balance" , "Exit"]
        }])
        
        switch (ans.select){
          case "Deposit":
            const depositAmount = await inquirer.prompt({
              name: "amount",
              type: "number",
              message: "Enter deposit amount:"
            })
            customer.account.deposit(depositAmount.amount);
            break;
          case "Withdraw":
            const withdrawAmount = await inquirer.prompt({
              name: "amount",
              type: "number",
              message: "Enter withdraw amount:"
            })  
            customer.account.withdraw(withdrawAmount.amount);
            break;
          case "Check Balance":
            customer.account.checkBalance();
            break;
          case "Exit":
            console.log(chalk.redBright("Exit bank program..."));
            return;
              
       }

      }else {
        console.log(chalk.red("Invalid account number. Please try again."));
        
      }
    
    }while(true)

}

service()