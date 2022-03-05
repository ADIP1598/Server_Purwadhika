const { db } = require('../database/index')
const { createToken } = require('../helper/createToken')
const Crypto = require('crypto')
const transporter = require('../helper/nodemailer')

module.exports = {
    getData: (req, res) => {
        let scriptQuery = 'SELECT * FROM users;'
        db.query(scriptQuery, (err, results) => {
            if (err) res.status(500).send(err)
            res.status(200).send(results)
        })
    },
    register: (req, res) => {
        console.log(req.body)
        let { username, email, password } = req.body
        password = Crypto.createHmac("sha1", "hash123").update(password).digest("hex")
        console.log(db.escape(username))
        let insertQuery = `INSERT INTO users VALUES (null,${db.escape(username)},${db.escape(email)},${db.escape(password)},'user',null);`
        console.log(insertQuery)
        db.query(insertQuery, (err, results) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            }
            console.log(results)
            if (results.insertId) {
                let sqlGet = `SELECT * FROM users WHERE idusers = ${results.insertId};`
                db.query(sqlGet, (err2, results2) => {
                    if (err2) {
                        console.log(err2)
                        res.status(500).send(err2)
                    }
                    console.log(results2)
                    // data untuk membuat token
                    let { idusers, username, email, role, status } = results2[0]
                    // // membuat token
                    let token = createToken({ idusers, username, email, role, status })
                    // let token = createToken({ name: "ADIP" })
                    console.log(token)

                    let mail = {
                        from: `Admin <dhiyailmamputra@gmail.com>`,
                        to: `${email}`,
                        subject: 'Account Verification',
                        html: `<h1>CUK!</h1><a href='http://localhost:3000/authentication/${token}'>Click here to verify your Account.</a>`
                    }
                    transporter.sendMail(mail, (errMail, resMail) => {
                        if (errMail) {
                            console.log(errMail)
                            res.status(500).send({ message: "Registration Failed!", success: false, err: errMail })
                        }
                        res.status(200).send({ message: "Registration Success, Check Your Email!", success: true })
                    })
                })
            }
        })
    },
    verification: (req, res) => {
        // console.log(req.user)
        let updateQuery = `UPDATE users SET status='verified' WHERE idusers = ${req.user.idusers};`
        db.query(updateQuery, (err, results) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            }
            res.status(200).send({ message: "Verified Account", success: true })
        })
    },
    editData: (req, res) => {
        let dataUpdate = []
        for (let prop in req.body) {
            dataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`)
        }
        let updateQuery = `UPDATE users SET ${dataUpdate} WHERE idusers = ${req.params.id};`
        console.log(updateQuery)
        db.query(updateQuery, (err, results) => {
            if (err) res.status(500).send(err)
            res.status(200).send(results)
        })
    }
}