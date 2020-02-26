const db = require('../data/dbConfig.js');

module.exports ={
    find,
    findBy,
    add,
    findById 
}

function find() {
    return db('users').select('id', 'username', 'password')
}

function findBy(filter) {
    return db('users')
    .select('id', 'username', 'password')
    .where(filter);
} 

async function add(user){
    return db('users').insert(user, 'id').then(([id]) => id)
}

function findById(id) {
    return db('users')
    .select('id', 'username')
    .where({id})
    .first();
}