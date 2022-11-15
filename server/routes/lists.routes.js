const express = require('express')
const listsController = require('../controllers/lists.controllers')

const router = express.Router()

router.get('/', listsController.read)

router.post('/create', listsController.create)

router.put('/update', listsController.update)

router.delete('/delete', listsController.del)

module.exports = router