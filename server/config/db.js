const url = `mongodb://${process.env.ID}:${process.env.PASSWORD}@localhost:27017/?authMechanism=DEFAULT&authSource=${process.env.DATABASE}`

module.exports = url