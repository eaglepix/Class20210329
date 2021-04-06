const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MySQL
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: null,
    database: 'classicmodels'
});

// pool.connect();
// pool.query('SELECT * from customers'), (err, rows) => {
//             connection.release()  // return the connection to pool
//             if (!err) {
//                 res.send(rows)
//             } else {
//                 console.log(err)
//             };
//         };

let customerName = contactName = [];

app.get('', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);
        // example: query(sqlString, callback)
        connection.query('SELECT * from customers LIMIT 10', (err, rows) => {
            // When done with the connection, release it.
            connection.release();
            if (!err) {
                // console.log(rows);
                for (let i = 0; i < rows.length; i++) {
                    customerName[i] = rows[i].customerName;
                    contactName[i] = rows[i].contactFirstName + ' ' + rows[i].contactLastName;
                }
                // console.log(customerName);
                res.send({
                    'Connection type' : 'Pool',
                    'customerName': customerName,
                    'contactName': contactName
                });
            } else {
                console.log(err)
            }
        });
    });
});



// app.get('', (req, res) => {
//     pool.then(function(p) {
//         return p.getConnection()
//     }).then(function(){
//         p.query('SELECT * from customers', (err, rows) => {
//             connection.release()  // return the connection to pool
//             if (!err) {
//                 res.send(rows)
//             } else {
//                 console.log(err)
//             }
//     });

// pool.getConnection((err, connection) => {
//     if (err) throw err;
//     console.log(`connected as id ${connection.threadId}`);
//     // example: query(sqlString, callback)
//     connection.query('SELECT * from customers', (err, rows) => {
//         connection.release()  // return the connection to pool
//         if (!err) {
//             res.send(rows)
//         } else {
//             console.log(err)
//         }
//     });
// });
//     });
// });


// Listen on environment port
app.listen(port, () => console.log(`Listen on port ${port}`));