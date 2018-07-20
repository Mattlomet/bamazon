var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon'
})
connection.connect((err) => {
    if (err) throw err;
    runManager();
})

function runManager() {
    inquirer.prompt([{
        type: "list",
        message: "what action would you like to take?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
        name: "action"
    }]).then((response) => {
        if (response.action == "View Products for Sale") {
            connection.query("SELECT * FROM products", (err, res) => {
                if (err) throw err;
                inventory = res;
                for (var i = 0; i < res.length; i++) {
                    console.log("--------------------");
                    console.log("Item: " + res[i].id);
                    console.log("name: " + res[i].name);
                    console.log("category: " + res[i].category);
                    console.log("price: " + res[i].price);
                    console.log("stock: " + res[i].quantity);
                    console.log("--------------------");
                }
                connection.end();
            });
        } else if (response.action == "View Low Inventory") {
            // need to work on this section
            connection.query("SELECT * FROM products WHERE quantity < 55", (err, res) => {
                if (err) throw err;
                console.log("Items with less then 50 stock: " + res);
                connection.end();
            })


        } else if (response.action == "Add to Inventory") {
            inquirer.prompt([{
                type: 'input',
                message: 'what object would you like to add to (use name)',
                name: "itemName"
            }, {
                type: "input",
                message: "how many would you like to add?",
                name: "count"
            }]).then((inquirerResponse) => {
                console.log(inquirerResponse.itemName);
                updateItemCount(inquirerResponse.itemName,inquirerResponse.count);
            })
        } else if (response.action == "Add New Product") {
            inquirer.prompt([{
                type: "input",
                message: "what is the product's name?",
                name: "name",
            }, {
                type: "input",
                message: "how many of the item do you have?",
                name: "quantity"
            }, {
                type: "input",
                message: "what is your item's price?",
                name: "price"
            }, {
                type: "input",
                message: "what is the category/department of your item",
                name: "category"
            }]).then(function (response) {
                var query = connection.query(
                    "INSERT INTO products SET ?", {
                        name: response.name,
                        quantity: response.quantity,
                        price: response.price,
                        category: response.category
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.log(res)
                        console.log("Your successfully added the: "+ response.name);
                        connection.end();
                    }
                )
            })
        }
    })
}

function updateItemCount(userName,count){
    connection.query("UPDATE products SET ? WHERE  ?",[{quantity: count},{name: userName}],(err,res)=>{
        if (err) throw err;
        console.log("You have updated the: "+userName);
        connection.end();
    })
}