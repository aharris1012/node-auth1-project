const bcrypt = require("bcryptjs")
const Users = require("./routers/users/userModel")

module.exports = (req,res,next) => {
    if (req.headers.username && req.headers.password) {
        Users.findBy({username: req.headers.username})
        .then(user => {
            if (user && bcrypt.compareSync(req.headers.password, user.password)){
                next()
            } else {
                res.status(401).json({message: "Invalid Credentials."})
            }
        })
        .catch(err => {
            res.status(500).json({name, message, stack})
        })
    } else {
        res.status(401).json({message: "Missing credentials in header."})
    }
    
}