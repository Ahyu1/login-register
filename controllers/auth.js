const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tryDB'
})

exports.register = (req, res) => {
    console.log(req.body);

    const {fullName, employeeID, department, username, password, advisory} = req.body;
    
    db.query('SELECT username FROM users WHERE username = ?', [username], async (error, result) => {
        if(error){
            console.log(error)
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', {fullName: fullName, employeeID: employeeID, department: department, username: username, password: hashedPassword, advisory: advisory}, (error, result) => {
            if(error) {
                console.log(error)
            }else{
                return res.render('register', {
                    message: 'user registered.'
                })
            }
        })
    })



    res.send("form submitted")
}