const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../users/users-model');

const usersRouter = require('../users/users-router.js');
router.use('/users', restricted, usersRouter);

router.get('/', (req, res) =>{
    res.send('Connected')
});

router.post('/register', (req, res) =>{
    let user = req.body;
    let hash = bcrypt.hashSync(user.password, 13);
    user.password = hash;
    Users.add(user)
    .then(saved => {
        req.session.loggedIn = true;
        res.status(201).json(saved);
    })
    .catch(err =>{
        res.status(500).json(error);
    })
})

router.post('/login', (req, res) =>{
    let { username, password } = req.body;
    console.log(username)
    console.log(password)
    Users.findBy({username})
    .first()
    .then(user =>{
        if(user && bcrypt.compareSync(password, user.password)) {
            req.session.loggedIn =true;
            res.status(200).json({ message: `Welcome ${user.username}!` });
        } else {
            res.status(401).json({message: 'Invalid Credentials'})
        }
    })
    .catch(({ name, message ,stack}) =>{res.status(500).json({name, message, stack})})
})
router.get('/logout', (req, res) =>{
    if(req.session) {
        req.session.destroy(err =>{
            if(err){
                res.json({message:'cant leave'})
            } else{
                res.status(200).json({message
                :'bye felicia'});
            }
        })
    } else{
        res.status(200).json({message
            :'no no'});
    }
})

module.exports = router;

function restricted(req, res, next){
    const { username, password } = req.headers;

    if(req.session && req.session.loggedIn){
        console.log(req.session.username)
        next();
    }else{
      res.status(401).json({message:'you shall not pass without valid credentials'})
    }

  } 
