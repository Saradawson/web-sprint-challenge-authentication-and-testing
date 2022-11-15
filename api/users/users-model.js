const db = require('../../data/dbConfig')

async function add({ username, password }) {
    const [id] = await db('users').insert({ username, password })
    return db('users')
        .where('id', id)
        .first()
}

function find() {
    return db('users')
}

function findBy(filter) {
    return db('users')
        .where(filter)
        .first()
}

module.exports = {
    add,
    find,
    findBy
}