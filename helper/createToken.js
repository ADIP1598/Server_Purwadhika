const jwt = require('jsonwebtoken')

module.exports = {
    createToken: (payload) => {
        return jwt.sign(payload, "adipadip", {
            expiresIn: '12h'
        })
    }
}