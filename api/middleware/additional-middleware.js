const User = require('../users/users-model')

const checkUsernameAndPassword = (req, res, next) => {
    const { username, password } = req.body
    if(!username || !password){
        next({ status: 401, message: 'username and password required'})
    }else{
        next()
    }
}

const registerUsernameExists = async (req, res, next) => {
    const existing = await User.findBy({ username: req.body.username })
    if(existing){
        next({ status: 401, message: 'username taken' })
    }else{
        next()
    }
}

const loginUsernameExists = async (req, res, next) => {
    const existing = await User.findBy({ username: req.body.username })
    if(!existing){
        next({ status: 401, message: 'invalid credentials' })
    }else{
        req.user = existing
        next()
    }
}

module.exports = {
    checkUsernameAndPassword,
    registerUsernameExists,
    loginUsernameExists
}