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
    runApp();
})

function runApp() {
    var inventory;
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
        runInquirer();
    });

    function runInquirer() {

        inquirer.prompt([{
            type: "input",
            message: "what product ID would you like to select?",
            name: "idChoice"
        }, {
            type: "input",
            message: "how many units would you like to purchase?",
            name: "stockChoice"
        }]).then((response) => {
            var selectionID = response.idChoice - 1;
            var selection = inventory[selectionID];
            if (response.stockChoice < selection.quantity) {
                console.log(selection);
                var newStock = selection.quantity - response.stockChoice;
                var newProductSale = (parseInt(selection.product_sales)+parseInt(response.stockChoice));
                updateStock(newStock, selection, response.stockChoice,newProductSale);

            } else {
                console.log("Insufficient quantity!")
                connection.end();
            }
        })
    }
}

function updateStock(newStock, selection, userQuant,newProductSale) {
     var totalCost = selection.price * userQuant;

     var totalSale = (parseInt(selection.product_sales) + totalCost)
    connection.query("UPDATE products SET ? WHERE ?", [{
        quantity: newStock,
        product_sales: totalSale
    }, {
        name: selection.name
    }], (err, res) => {
        if (err) throw err;
       
        console.log("Your total is: $" + totalCost)
        connection.end();
    })
}