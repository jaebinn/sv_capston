// models/qna.js

const mysql = require('../config/mysql');
const moment = require('moment');

require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

let Question = function (question, currentUser) {
    this.user_id = currentUser.user_id;
    this.author = currentUser.nickname;
    this.title = question.title;
    this.content = question.content;
    this.img = question.img;
    this.date = moment().format('YYYY-MM-DD');
    this.count = 0;
}

let Comment = function (comment, id, currentUser) {

    this.user_id = currentUser.user_id;
    this.author = currentUser.nickname;
    this.post_id = parseInt(id);
    this.content = comment.content;
    this.date = moment().format('YYYY-MM-DD');
}

Question.create = function (data) {
    const sql = `INSERT INTO qna(user_id, author, title, content, img, date, count) VALUES(?,?,?,?,?,?,?)`
    return mysql.promise().query(sql, data)
        .then(result => {
            console.log("successfully saved Question");
            return result[0].insertId;
        })
}

Question.findById = function (id) {
    const sql = `SELECT post_id, user_id, author, title, content, img, date_format(date, '%Y-%m-%d') AS date, count FROM qna WHERE post_id=?`;
    return mysql.promise().query(sql, [id])
        .then(rows => {
            if (rows.length > 0) {
                return rows[0];
            }
            else {
                return null;
            }
        })
        .catch(err => {
            return err;
        })
}

Question.findByPage = function (data) {
    const sql = `SELECT post_id, author, title, date_format(date, '%Y-%m-%d') AS date, count FROM qna ORDER BY post_id DESC LIMIT ?,? `;
    return mysql.promise().query(sql, data)
        .then(rows => {
            if (rows.length > 0) {
                return rows[0];
            }
            else {
                return null;
            }
        })
}

Question.updateBoard = function (data) {
    const sql = `UPDATE qna SET author=?, title=?, content=?, date=?, img=? WHERE post_id=?`
    return mysql.promise().query(sql, data)
        .then(result => {
            return result[0];
        })
}

Question.countAll = function () {
    const sql = `SELECT COUNT(*) AS total FROM qna`;
    return mysql.promise().query(sql)
        .then(rows => {
            if (rows.length > 0) {
                return rows[0];
            }
            else {
                return null;
            }
        })
}

Question.deleteById = function (id) {
    const sql = `DELETE FROM qna WHERE post_id=?`
    return mysql.promise().query(sql, id)
        .then(rows => {
            if (rows.length > 0) {
                return rows[0];
            }
            else {
                return null;
            }
        })
}

Comment.create = function (data) {
    const sql = `INSERT INTO qna_comment(post_id,user_id, author,content,date) values(?,?,?,?,?)`
    return mysql.promise().query(sql, data)
        .then(rows => {
            if (rows.length > 0) {
                return rows[0];
            }
            else {
                return null;
            }
        })
}

Comment.findCommentById = function (id) {
    const sql = `SELECT comment_id, user_id, author, content, date_format(date, '%Y-%m-%d') AS date FROM qna_comment WHERE post_id =? ORDER BY post_id DESC`
    return mysql.promise().query(sql, id)
        .then(rows => {
            if (rows.length > 0) {
                return rows[0];
            }
            else {
                return null;
            }
        })
}

Comment.updateComment = function (data) {
    const sql = `UPDATE qna_comment SET content=?, date=? WHERE comment_id=? AND user_id=?`
    return mysql.promise().query(sql, data)
        .then(rows => {
            if (rows.length > 0) {
                return rows[0];
            }
            else {
                return null;
            }
        })
}

Comment.deleteComment = function (data) {
    const sql = `DELETE FROM qna_comment WHERE comment_id=? AND user_id=?`;
    return mysql.promise().query(sql, data)
        .then(rows => {
            if (rows.length > 0) {
                return rows[0];
            }
            else {
                return null;
            }
        })
}

module.exports = { Question, Comment };