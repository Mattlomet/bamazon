var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon'
})
connection.connect((err) => {
    if (err) throw err;
    runSupervisor();
})

function runSupervisor() {
    inquirer.prompt([{
        type: 'list',
        choices: ['view products sold by deparment', 'create a new department'],
        name: 'action'
    }]).then((inquirerResponse) => {
        if (inquirerResponse.action == "view products sold by deparment") {
            viewProducts();
        } else if (inquirerResponse.action == "create a new department") {
            createNewDepartment();
        }
    })
}
// SELECT column_name(s)
// FROM table1
// LEFT JOIN table2 ON table1.column_name = table2.column_name;

// "SELECT deparment_id,department_name,over_head_costs, product_sales FROM departments JOIN products ON departments.department_name = products.category GROUP BY department_name"
// var departmentsRes;
// var productsRes;
// connection.query("SELECT * From departments", (err, res) => {
//     if (err) throw err;
//     departmentsRes = res;
//     connection.query("SELECT * From products", (err, rest) => {
//         if (err) throw err;
//         productsRes = rest;
//         connection.end();
//         runFunc();
//     })
// })

// function runFunc() {
//     for (var i = 0; i < produdctsRes.length; i++) {
//         produdctsRes[i]
//     }
//     console.table(productsRes)
//     console.table(departmentsRes);
// }

function viewProducts() {
        connection.query("SELECT id deparment_id,department_name,over_head_costs, product_sales FROM products JOIN departments ON departments.department_name = products.category GROUP BY department_name",(err,res)=>{
            if (err) throw err;
            console.log(res);
            console.table([{deparment_id: res[0].deparment_id,over_head_costs: 1000}]);
            connection.end();

        })
    // console.table([{
    //         deparment_id: x
    //     },
    //     {
    //         deparment_name: x
    //     },
    //     {
    //         over_head_costs: x
    //     },{
    //         product_sales: x
    //     },{
    //         totalprofit: x
    //     }
    // ])
    // need to get npm package to display tables
    // left is deparment_id & overheadcosts
    // middle is deparment_name & product sales
    // right is total profit
    // totalprofit= overheadcosts & product sales
    // > use "custom alias" for this value
}

function createNewDepartment() {
    inquirer.prompt([{
        type: "input",
        message: "what is the departments's name?",
        name: "name",
    }, {
        type: "input",
        message: "what is this departments over head costs?",
        name: "quantity"
    }]).then(function (response) {
        var query = connection.query(
            "INSERT INTO departments SET ?", {
                department_name: response.name,
                over_head_costs: response.quantity,
            },
            function (err, res) {
                if (err) throw err;
                console.log(res)
                console.log("Your successfully added the: " + response.name);
                connection.end();
            }
        )
    })
}