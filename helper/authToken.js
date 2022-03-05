const jwt = require('jsonwebtoken')

module.exports = {
    auth: (req, res, next) => {
        jwt.verify(req.token, "adipadip", (err, decode) => {
            if (err) {
                return res.status(401).send("User not Auth!")
            }
            req.user = decode

            next()
        })
    }
}