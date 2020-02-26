const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../users/users-model');

const usersRouter = require('../users/users-router.js');

router.get('/', (req, res) =>{
    res.send('<h1>Connected</h1>')
});

router.post('/register', (req, res) =>{
    
    let user = req.body;
    console.log(user);
    const hash = bcrypt.hashSync(user.password, 2);
    user.password = hash;

    Users.add(user)
    .then(saved => {
        res.status(201).json(saved);
    })
    .catch(err =>{
        res.status(500).json(error);
    })
})

router.post('/login', (req, res) =>{
    let { username, password } = req.body; 
    Users.findBy({ username })
    .first()
    .then(user =>{
        if(user && bcrypt.compareSync(password, user.password)) {
            res.status(200).json({ message: `Welcome ${user.username}!` });
        } else {
            res.status(401).json({message: 'Invalid Credentials'})
        }
    })
    .catch(({ name, message ,stack}) =>{res.status(500).json({name, message, stack})})
})

router.get('/users', (req, res)=> {
    Users.find().then(users => {
        res.status(200).json({users})
    }).catch(error => {
        res.status(500).json(error)
    })
})
module.exports = router;