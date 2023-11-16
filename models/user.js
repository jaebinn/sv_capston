// models/User.js

const mysql = require('../config/mysql');


let User = function (user) {
    this.email = user.email;
    this.password = user.password;
    this.nickname = user.nickname;
}

User.findByEmail = function (email) {
    const sql = `SELECT * FROM user_info WHERE email =?`;
    return mysql.promise().query(sql, [email])
        .then(rows => {
            if (rows.length > 0) {
                return rows[0];
            }
            else {
                return null;
            }
        })
}

User.findById = function (id) {
    const sql = `SELECT * FROM user_info WHERE user_id=?`;
    return mysql.promise().query(sql, [id])
        .then(rows => {
            if (rows.length > 0) {
                return rows[0];
            }
            else {
                return null;
            }
        })
}


User.createUser = function (email, hashedPassword, nickname) {
    const sql = `INSERT INTO user_info(email, password,nickname) VALUES (?,?,?)`;
    return mysql.promise().query(sql, [email, hashedPassword, nickname])
        .then(result => {
            return result[0].insertId;
        })
}





module.exports = User;