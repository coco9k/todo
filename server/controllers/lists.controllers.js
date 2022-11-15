const url = require('../config/db')
const { MongoClient } = require("mongodb")

const read = async (req, res) => {
    const client = new MongoClient(url)
    await client.connect()
    const lists = await client.db('todo').collection('lists').find({},{"sort" : [['date', 'asc']]}).toArray()
    await client.close()
    res.status(200).send(lists)
}

const create = async (req, res) => {
    const todo = req.body
    const client = new MongoClient(url)
    await client.connect()
    await client.db('todo').collection('lists').insertOne({
        id: todo.id,
        title: todo.title,
        detail: todo.detail,
        date: todo.date,
        check: todo.check
    })
    await client.close()
    res.status(200).send({
        "status": "ok",
        "message": "Create To Do List Successful.",
        "todo": todo
    })
}

const update = async (req, res) => {
    const todo = req.body
    const id = todo.id
    const client = new MongoClient(url)
    await client.connect()
    await client.db('todo').collection('lists').updateOne({ 'id': id }, {
        '$set': {
            title: todo.title,
            detail: todo.detail,
            date: todo.date,
            check: todo.check
        }
    })
    await client.close()
    res.status(200).send({
        "status": "ok",
        "message": "Update To Do List Successful.",
        "todo": todo
    })
}

const del = async (req, res) => {
    const id = req.body.id
    const client = new MongoClient(url)
    await client.connect()
    await client.db('todo').collection('lists').deleteOne({'id': id})
    await client.close()
    res.status(200).send({
        "status": "ok",
        "message": "To Do List id: "+ id +" is delted.",
    })
}

module.exports = {
    read: read,
    create: create,
    update: update,
    del: del
}